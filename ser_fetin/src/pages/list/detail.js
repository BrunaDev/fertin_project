import React, { useLayoutEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from '../../styles/list/stylesDetail';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto, FontAwesome6 } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import * as Notifications from 'expo-notifications';

const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
        return new Date(timestamp.seconds * 1000);
    }
    return new Date();
};

const cancelScheduledNotification = async (notificationId) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
        console.error('Erro ao cancelar a notificação agendada:', error);
    }
};

const scheduleNotification = async (title, description, date, soundType = 'default', vibrationType = 'default') => {
    const trigger = new Date(date).getTime() - new Date().getTime();
    if (trigger <= 0) {
        alert('A data e hora selecionadas já passaram!');
        return null;
    }

    const sound = soundType === 'default' ? undefined : soundType;
    const vibrationPattern = vibrationType === 'default' ? undefined : [100, 200, 300]; // Exemplo de padrão de vibração

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: description || 'Não esqueça do seu compromisso!',
            sound: sound,
            vibrate: vibrationPattern,
            data: { data: 'goes here' },
        },
        trigger: { seconds: Math.ceil(trigger / 1000) },
    });

    return notificationId;
};

export default function Detail() {
    const route = useRoute();
    const navigation = useNavigation();
    const onUpdateReminders = route.params?.onUpdateReminders;

    const [title, setTitle] = useState(route.params?.data.title || '');
    const [description, setDescription] = useState(route.params?.data.description || '');
    const [date, setDate] = useState(convertTimestampToDate(route.params?.data.date));
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [isEditing, setIsEditing] = useState(false);
    const [soundType, setSoundType] = useState('default');
    const [vibrationType, setVibrationType] = useState('default');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Detalhes do lembrete",
            headerRight: () => (
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        if (isEditing) {
                            handleSave(soundType, vibrationType); // Passando soundType e vibrationType para handleSave
                        }
                        setIsEditing(!isEditing);
                    }}
                >
                    <Text style={styles.editButtonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, isEditing, soundType, vibrationType]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSave = async (soundType, vibrationType) => { // Recebendo soundType e vibrationType como parâmetros
        const reminderId = route.params?.data.id;
        const oldNotificationId = route.params?.data.notificationId;

        if (reminderId) {
            const reminderDocRef = doc(db, 'reminders', reminderId);
            try {
                // Cancelar notificação anterior
                if (oldNotificationId) {
                    await cancelScheduledNotification(oldNotificationId);
                }

                // Agendar nova notificação com configurações personalizadas
                const newNotificationId = await scheduleNotification(title, description, date, soundType, vibrationType);

                await updateDoc(reminderDocRef, {
                    title: title,
                    description: description,
                    date: date,
                    notificationId: newNotificationId,
                });

                console.log('Documento atualizado com sucesso!');
                onUpdateReminders();
            } catch (error) {
                console.error('Erro ao atualizar o documento:', error);
            }
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={title}
                onChangeText={setTitle}
                placeholder="Título do lembrete"
                editable={isEditing}
            />
            <TextInput
                style={[styles.input, styles.multilineInput, !isEditing && styles.disabledInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição do lembrete"
                multiline={true}
                numberOfLines={4}
                scrollEnabled={true}
                editable={isEditing}
            />
            <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={date.toLocaleString()}
                placeholder="Horário"
                editable={false}
            />
            {isEditing && (
                <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('date')}>
                        <Fontisto name="date" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('time')}>
                        <FontAwesome6 name="clock" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            )}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}
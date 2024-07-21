import React, { useLayoutEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
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

const scheduleNotification = async (title, description, date, soundEnabled, vibrationEnabled) => {
    const trigger = new Date(date).getTime() - new Date().getTime();

    if (trigger <= 0) {
        Alert.alert('A data e hora selecionadas já passaram!');
        return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: description,
            sound: soundEnabled ? 'default' : null,
            vibrate: vibrationEnabled ? [0, 250, 250, 250] : null,
            data: { data: 'goes here' }
        },
        trigger: { seconds: Math.ceil(trigger / 1000) },
    });

    return notificationId;
};

export default function Detail() {
    const route = useRoute();
    const navigation = useNavigation();

    const onUpdateReminders = route.params?.onUpdateReminders;

    const [title, setTitle] = React.useState(route.params?.data.title || '');
    const [description, setDescription] = React.useState(route.params?.data.description || '');
    const [date, setDate] = useState(convertTimestampToDate(route.params?.data.date) || new Date());

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const [isEditing, setIsEditing] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(route.params?.data.soundEnabled || false);
    const [vibrationEnabled, setVibrationEnabled] = useState(route.params?.data.vibrationEnabled || false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Detalhes do lembrete"
        });
    }, [navigation, isEditing]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };    

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSave = async () => {
        const reminderId = route.params?.data.id;
        const oldNotificationId = route.params?.data.notificationId;

        if (reminderId) {
            const reminderDocRef = doc(db, 'reminders', reminderId);
    
            try {
                if (oldNotificationId) {
                    await cancelScheduledNotification(oldNotificationId);
                }
    
                const newNotificationId = await scheduleNotification(
                    title,
                    description,
                    date,
                    soundEnabled,
                    vibrationEnabled
                );
    
                if (newNotificationId) {
                    await updateDoc(reminderDocRef, {
                        title: title,
                        description: description,
                        date: date,
                        notificationId: newNotificationId,
                        soundEnabled,
                        vibrationEnabled,
                    });
                    onUpdateReminders();
                } else {
                    console.error('Erro ao agendar a nova notificação.');
                }
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
                onChangeText={text => setTitle(text)}
                placeholder="Título do lembrete"
                editable={isEditing}
            />
            <TextInput
                style={[styles.input, styles.multilineInput, !isEditing && styles.disabledInput]}
                value={description}
                onChangeText={text => setDescription(text)}
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
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (isEditing) {
                            handleSave();
                        }
                        setIsEditing(!isEditing);
                    }}
                >
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
        </View>
    );
}
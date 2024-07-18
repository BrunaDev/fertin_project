import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    TextInput,
    Alert
} from 'react-native';
import {
    Ionicons,
    Fontisto,
    FontAwesome6
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styles } from '../../styles/addReminder/styles';
import { db } from '../../services/firebase.config';
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

//TODO: As notificações devem permitir que o usuário troque a data e a hora do disparo (no Detail)
//ou seja, não pode ser fixa na criação, deve verificar direto no banco para saber quando disparar.
//Podemos fazer em um arquivo separado, se necessário
//Outra coisa da notificação é que ela deve seguir o som e a vibração definidas em src/pages/notification/config.js
const remindersCollection = collection(db, "reminders");
const auth = getAuth();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Falha ao obter o token de notificação push!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Deve usar dispositivo físico para notificações push');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

async function sendReminder(title, description, date, onUpdateReminders, navigation) {
    const token = await registerForPushNotificationsAsync();
    if (!token) return;

    const trigger = new Date(date).getTime() - new Date().getTime();
    if (trigger <= 0) {
        alert('A data e hora selecionadas já passaram!');
        return;
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: description || 'Não esqueça do seu compromisso!',
            data: { data: 'goes here' },
        },
        trigger: { seconds: Math.ceil(trigger / 1000) },
    });

    const reminder = {
        title,
        description,
        date,
        userId: auth.currentUser.uid
    };

    try {
        await addDoc(remindersCollection, reminder);
        onUpdateReminders();
        alert('Lembrete salvo com sucesso!');
        navigation.goBack();
    } catch (error) {
        alert('Erro ao salvar o lembrete: ' + error.message);
    }
}

export default function Reminder() {
    const navigation = useNavigation();
    const route = useRoute();
    const onUpdateReminders = route.params?.onUpdateReminders;

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSave = () => {
        sendReminder(title, description, date, onUpdateReminders, navigation);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.navigate("Home")}>
                <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.containerHeader}>
                <Animatable.Text animation="fadeInLeft" delay={500} style={styles.namePage}>Adicionar Lembrete</Animatable.Text>           

                <Text style={styles.title}>Título</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Digite o nome do lembrete...'
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <Text style={styles.title}>Descrição (opcional)</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Digite uma breve descrição sobre o lembrete...'
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <Text style={styles.title}>Selecionar data e hora</Text>
                <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('date')}>
                        <Fontisto name="date" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('time')}>
                        <FontAwesome6 name="clock" size={40} color="black" />
                    </TouchableOpacity>
                </View>

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

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { styles } from '../styles/list/styles';
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc } from 'firebase/firestore';
import { FontAwesome6 } from '@expo/vector-icons';
import { db } from '../services/firebase.config';
import * as Notifications from 'expo-notifications';

export function List({ data, onUpdateReminders, onLongPress, isActive }) {
    const navigation = useNavigation();
    const notificationId = data.notificationId;

    const convertTimestampToDate = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            return new Date(timestamp.seconds * 1000);
        }
        return new Date();
    };

    const handleNavigate = () => {
        navigation.navigate("Detail", { data: data, onUpdateReminders: onUpdateReminders });
    };

    const handleDelete = async () => {
        try {
            if (notificationId) {
                await Notifications.cancelScheduledNotificationAsync(notificationId);
            }
            await deleteDoc(doc(db, "reminders", data.id));
            onUpdateReminders();
        } catch (error) {
            console.error("Erro ao deletar o lembrete:", error);
        }
    };

    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            disabled={isActive}
            style={[styles.container, isActive && { backgroundColor: '#f0f0f0' }]}
            onPress={handleNavigate}
        >
            <Image
                source={require('../../assets/background-list.png')}
                style={styles.images}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.time}>Horário: {convertTimestampToDate(data.date).toLocaleString()}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <FontAwesome6 name="trash" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
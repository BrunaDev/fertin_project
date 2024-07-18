import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    BackHandler,
    Alert,
    FlatList,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/home/styles';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import { getAuth } from 'firebase/auth';

import { List } from '../../components/index';

const remindersCollectionRef = collection(db, 'reminders');
const auth = getAuth();

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Opa!', 'Você tem certeza que deseja sair?', [
                {
                    text: 'Cancelar',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [isFocused]);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const q = query(remindersCollectionRef, where('userId', '==', auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            
            const remindersData = [];
            querySnapshot.forEach((doc) => {
                remindersData.push({ id: doc.id, ...doc.data() });
            });
            setReminders(remindersData);
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
        }
    };

    const handleUpdateReminders = () => {
        fetchReminders();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Lembretes</Text>
                </Animatable.View>

                <FlatList
                    data={reminders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <List data={item} onUpdateReminders={handleUpdateReminders} />}
                    showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity
                    style={styles.addReminderButton}
                    onPress={() => navigation.navigate('Reminder', { onUpdateReminders: handleUpdateReminders })}
                >
                    <Image
                        source={require('../../../assets/button-plus.png')}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
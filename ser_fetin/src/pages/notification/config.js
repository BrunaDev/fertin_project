import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/notification/styles';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import {Picker} from '@react-native-picker/picker';
import { Switch } from 'react-native-gesture-handler';

export default function NotificationSettings() {
    const navigation = useNavigation();
    const auth = getAuth();

    const [selectedSound, setSelectedSound] = useState('notification.wav');
    const [vibrationEnabled, setVibrationEnabled] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const userId = auth.currentUser.uid;
            const userDoc = doc(db, "users", userId);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                const userSettings = userSnapshot.data();
                setSelectedSound(userSettings.selectedSound || 'notification.wav');
                setVibrationEnabled(userSettings.vibrationEnabled);
            }
        };

        fetchSettings();
    }, []);

    const handleSaveSettings = async () => {
        const userId = auth.currentUser.uid;
        const userDoc = doc(db, "users", userId);

        try {
            await updateDoc(userDoc, {
                selectedSound,
                vibrationEnabled,
            });
            Alert.alert('Configurações salvas com sucesso!');
        } catch (error) {
            Alert.alert('Erro ao salvar as configurações.');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.goBack()}>
                <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            
            <View style={styles.containerHeader}>
                <Text style={styles.namePage}>Configurações de Notificação</Text>

                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Som</Text>
                    <Picker
                        selectedValue={selectedSound}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setSelectedSound(itemValue)}
                    >
                        <Picker.Item label="Som de Notificação Padrão" value="notification.wav" />
                        <Picker.Item label="Som de Nível Up" value="level-up.wav" />
                        <Picker.Item label="Som de Mensagem Recebida" value="message-incoming.wav" />
                        <Picker.Item label="Som de Notificação de Mensagem" value="message-notification.wav" />
                        <Picker.Item label="Som de Notificação de Ligação" value="phone-notification.wav" />
                        <Picker.Item label="Som de Notificação Simples" value="simple-notification.wav" />
                    </Picker>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Vibração</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={vibrationEnabled ? "#4bf588" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setVibrationEnabled(value)}
                        value={vibrationEnabled}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
                    <Text style={styles.buttonText}>Salvar Configurações</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Alert,
    TextInput
} from 'react-native';

import { styles } from '../../styles/user/styles';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import {
    getAuth,
    sendPasswordResetEmail
} from 'firebase/auth';

export default function Password() {
    const navigation = useNavigation();

    const [currentEmail, setCurrentEmail] = useState('');

    const handleChangePassword = () => {
        if (!currentEmail) {
            Alert.alert('Erro', 'Por favor, preencha o campo de email.');
            return;
        }

        const auth = getAuth();

        sendPasswordResetEmail(auth, currentEmail)
            .then(() => {
                Alert.alert('Sucesso', 'Email de redefinição de senha enviado com sucesso!');
                setCurrentEmail('');
                navigation.navigate('Login');
            })
            .catch(error => {
                console.error('Erro ao enviar email de redefinição de senha:', error);
                Alert.alert('Erro', 'Não foi possível enviar o email de redefinição de senha.');
            });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={ () => navigation.goBack()}>
                <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            
            <View style={styles.containerHeader}>
                <Text style={styles.namePage}>Alterar Senha</Text>
                
                <TextInput
                    style={styles.input}
                    value={currentEmail}
                    onChangeText={setCurrentEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>Alterar Senha</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
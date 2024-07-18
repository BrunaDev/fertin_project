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
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword
} from 'firebase/auth';

export default function Password() {
    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Erro', 'A nova senha e a confirmação da senha não coincidem.');
            return;
        }

        // Obter o usuário atual
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            Alert.alert('Erro', 'Nenhum usuário autenticado encontrado.');
            return;
        }

        // Criar credenciais com a senha atual
        const credentials = EmailAuthProvider.credential(user.email, currentPassword);

        reauthenticateWithCredential(user, credentials)
            .then(() => {
                updatePassword(user, newPassword)
                    .then(() => {
                        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar a senha:', error);
                        Alert.alert('Erro', 'Não foi possível alterar a senha.');
                    });
            })
            .catch(error => {
                console.error('Erro na reautenticação:', error);
                Alert.alert('Erro', 'Senha atual incorreta.');
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
                
                <View style={[styles.inputContainer, styles.passwordInputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Senha atual"
                        secureTextEntry={!showPassword1}
                    />
                    <TouchableOpacity
                        style={styles.passwordVisibilityToggle}
                        onPress={() => setShowPassword1(!showPassword1)}
                    >
                        <Ionicons
                            name={showPassword1 ? 'eye-off' : 'eye'}
                            size={24}
                            color='grey'
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, styles.passwordInputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Nova senha"
                        secureTextEntry={!showPassword2}
                    />
                    <TouchableOpacity
                        style={styles.passwordVisibilityToggle}
                        onPress={() => setShowPassword2(!showPassword2)}
                    >
                        <Ionicons
                            name={showPassword2 ? 'eye-off' : 'eye'}
                            size={24}
                            color='grey'
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, styles.passwordInputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        placeholder="Confirmar nova senha"
                        secureTextEntry={!showPassword3}
                    />
                    <TouchableOpacity
                        style={styles.passwordVisibilityToggle}
                        onPress={() => setShowPassword3(!showPassword3)}
                    >
                        <Ionicons
                            name={showPassword3 ? 'eye-off' : 'eye'}
                            size={24}
                            color='grey'
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={styles.buttonText}>Alterar Senha</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
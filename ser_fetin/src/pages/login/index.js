import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';

import { styles } from '../../styles/login/styles';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import app from '../../services/firebase.config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function sendForm() {
        setLoading(true);
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, user, password);
            setLoading(false);
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            Alert.alert("Usuário não encontrado.", "Verifique seu e-mail ou senha.")
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.navigate("LoggedOut")}>
                    <Ionicons name="return-up-back" size={30} color="black" />
                </TouchableOpacity>

                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Logar</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Digite seu usuário...'
                            style={styles.input}
                            onChangeText={text => setUser(text)}
                        />
                    </View>

                    <View style={[styles.inputContainer, styles.passwordInputContainer]}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            placeholder='Digite sua senha...'
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibilityToggle}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color='grey'
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => sendForm()}>
                        {loading ? (
                            <ActivityIndicator
                                size={'small'}
                                color={'white'}
                                animating={loading}
                            />
                        ) : (
                            <Text style={styles.buttonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('NewPassword')}>
                        <Text style={styles.buttonRegisterText}>Esqueceu a senha? Alterar</Text>
                    </TouchableOpacity>

                </Animatable.View>
            </View>
        </KeyboardAvoidingView>
    )
}
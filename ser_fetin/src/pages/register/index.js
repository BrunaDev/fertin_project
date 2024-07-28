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

import { styles } from '../../styles/register/styles';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../services/firebase.config';

export default function Register() {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function sendForm() {
        setLoading(true);
        try {
            const auth = getAuth(app);
            if (!user || !password) {
                throw new Error("Email e senha são obrigatórios.");
            }
            if (!/\S+@\S+\.\S+/.test(user)) {
                throw new Error("Formato de email inválido.");
            }
            await createUserWithEmailAndPassword(auth, user, password);
            await signInWithEmailAndPassword(auth, user, password);
            setLoading(false);
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            let errorMessage = "Não foi possível criar o usuário. Tente novamente mais tarde.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este email já está em uso.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Email inválido.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "A senha deve ter pelo menos 6 caracteres.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            Alert.alert(errorMessage);
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
                    <Text style={styles.message}>Registrar</Text>
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
                            <Text style={styles.buttonText}>Próximo</Text>
                        )}
                    </TouchableOpacity>

                </Animatable.View>
            </View>
        </KeyboardAvoidingView>
    )
}
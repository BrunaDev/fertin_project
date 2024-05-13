import {
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    View
} from 'react-native';

import { styles } from '../../styles/login/styles';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const navigation = useNavigation();

    async function sendForm()
    {
        navigation.navigate('Home');
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <TouchableOpacity style={styles.buttonReturn} onPress={ () => navigation.navigate("LoggedOut")}>
                    <Ionicons name="return-up-back" size={30} color="black" />
                </TouchableOpacity>

                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Logar</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                    <Text style={styles.title}>Usuário</Text>
                    <TextInput
                    placeholder='Digite seu usuário...'
                    style={styles.input}
                    onChangeText={text => setUser(text)}
                    />

                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                    secureTextEntry={true}
                    placeholder='Digite sua senha...'
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={ () => sendForm()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRegister} onPress={ () => navigation.navigate('Register')}>
                    <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>

                </Animatable.View>
            </View>
        </KeyboardAvoidingView>
    )
}
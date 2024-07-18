import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';

import { Feather, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/settings/styles';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { getAuth, signOut } from 'firebase/auth';

export default function Settings(){
    const navigation = useNavigation();
    const auth = getAuth();

    async function logoutUser() {
        signOut(auth).then(() => {
            navigation.navigate('LoggedOut');
          }).catch((error) => {
            Alert.alert('Algo deu errado, tente novamente mais tarde.', error.message);
          });
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Configurações</Text>
                </Animatable.View>

                <View style={styles.containerForm}>
                    <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate("User")}>
                        <FontAwesome6 style={styles.icons} name="user-pen" size={24} color="black" />
                        <Text style={styles.buttonText}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate("Notification")}>
                        <Ionicons style={styles.icons} name="notifications-outline" size={24} color="black" />
                        <Text style={styles.buttonText}>Notificações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate("Password")}>
                        <MaterialIcons style={styles.icons} name="password" size={24} color="black" />
                        <Text style={styles.buttonText}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.buttonLogout} onPress={ () => logoutUser()}>
                    <Feather name="log-out" size={30} color="black" />
                    <Text style={styles.buttonTextLogout} >Sair</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
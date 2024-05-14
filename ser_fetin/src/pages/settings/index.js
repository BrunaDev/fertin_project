import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

import { Feather, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/settings/styles';

import { useNavigation } from '@react-navigation/native';

export default function Settings(){
    const navigation = useNavigation();

    async function logoutUser()
    {
        navigation.navigate('LoggedOut');
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                /* Edição de usuário */
                <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate("User")}>
                    <FontAwesome6 name="user-pen" size={24} color="black" />
                    <Text style={styles.textButton} >Perfil</Text>
                </TouchableOpacity>
                /* Edição de notificações */
                <TouchableOpacity style={styles.buttons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.textButton} >Notificações</Text>
                </TouchableOpacity>
                /* trocar senha */
                <TouchableOpacity style={styles.buttons}>
                    <MaterialIcons name="password" size={24} color="black" />
                    <Text style={styles.textButton} >Alterar senha</Text>
                </TouchableOpacity>
                /* deslogar usuário */
                <TouchableOpacity style={styles.buttonLogout} onPress={ () => logoutUser()}>
                    <Feather name="log-out" size={24} color="black" />
                    <Text style={styles.textButton} >Sair</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
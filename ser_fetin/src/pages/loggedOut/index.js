import { View, Text, TouchableOpacity, Image } from 'react-native';

import { styles } from '../../styles/loggedOut/styles';
import { useNavigation } from '@react-navigation/native';

export default function LoggedOut(){

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Image style={styles.images} source={require('../../../assets/logged.png')}/>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttonLogin} onPress={ () => navigation.navigate("Login")}>
                    <Text style={styles.loginText}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister} onPress={ () => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>REGISTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) 
}
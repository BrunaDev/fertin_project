import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

import { styles } from '../../styles/user/styles';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Password(){

    const navigation = useNavigation();

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <TouchableOpacity style={styles.buttonReturn} onPress={ () => navigation.navigate("Settings")}>
                    <Ionicons name="return-up-back" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
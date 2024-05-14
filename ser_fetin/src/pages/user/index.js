import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

import { styles } from '../../styles/user/styles';

import { useNavigation } from '@react-navigation/native';

export default function User(){

    const navigation = useNavigation();

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}></View>
        </KeyboardAvoidingView>
    )
}
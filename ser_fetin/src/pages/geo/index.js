import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from '../../styles/home/styles';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Geolocalization(){

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
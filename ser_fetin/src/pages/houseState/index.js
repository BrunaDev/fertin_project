import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

import { styles } from '../../styles/houseState/styles';

import { useNavigation } from '@react-navigation/native';

//TODO: Área que ficará a relação de verificação e tranca da porta
export default function HouseState(){

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
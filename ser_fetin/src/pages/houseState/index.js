import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { styles } from '../../styles/houseState/styles';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';

//TODO: precisamos da conectividade com a tranca para prosseguir.
export default function HouseState() {
    const [isLocked, setIsLocked] = useState(false);
    const navigation = useNavigation();

    const toggleLockState = () => {
        setIsLocked(!isLocked);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.namePage}>
                    <Text style={styles.message}>Estado atual da tranca</Text>
                </Animatable.View>
            </View>

            <View style={styles.containerPage}>
                <Image
                    style={styles.image}
                    source={isLocked 
                        ? require('../../../assets/casa-com-cadeado-trancado.png') 
                        : require('../../../assets/casa-com-cadeado-destrancado.png')
                    }
                />
                <View style={styles.containerBody}>
                    <Text style={styles.statusText}>
                        {isLocked ? "A porta está trancada" : "A porta está destrancada"}
                    </Text>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={toggleLockState}
                    >
                        <Text style={styles.buttonText}>
                            {isLocked ? "Destrancar Porta" : "Trancar Porta"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
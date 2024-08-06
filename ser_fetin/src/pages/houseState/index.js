import React, { useContext } from 'react';
import { KeyboardAvoidingView, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/houseState/styles';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LockContext } from '../../components/context';

// TODO: fazer conexão com o hardware para saber o real estado da porta
// TODO: precisa ser um vai e vem, vai comandos e vem leituras de estado
export default function HouseState() {
    const { isLocked, toggleLockState } = useContext(LockContext);
    const navigation = useNavigation();

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
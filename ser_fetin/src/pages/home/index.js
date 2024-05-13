import React, {useEffect, useState} from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    BackHandler,
    Alert,
    FlatList
} from 'react-native';

import { styles } from '../../styles/home/styles';
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Home(){
    const navigation = useNavigation();

    const isFocused = useIsFocused();

    useEffect(() => {        
        const backAction = () => {
            Alert.alert('Opa!', 'Você tem certeza que deseja sair?', [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel',
            },
            {text: 'Sim', onPress: () => BackHandler.exitApp()},
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [isFocused]);

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Lembretes</Text>
                </Animatable.View>
                
            </View>
        </KeyboardAvoidingView>
    )
}
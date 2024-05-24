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

import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from '../../styles/home/styles';
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {List} from '../list/index';
import api from '../../services/api';

export default function Home(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [reminders, setReminders] = useState([]);

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

    useEffect(() => {
        async function fetchApi(){
            const response = await api.get("/reminders");
            setReminders(response.data);
        }
        fetchApi();
    }, []);

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.containerHeader}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerBody}>
                    <Text style={styles.message}>Lembretes</Text>
                </Animatable.View>

                <FlatList
                    data={reminders}
                    //renderItem={({item}) => <Item title={item.title} />}
                    keyExtractor={item => String(item.id)}
                    renderItem={ (item) => <List data={item} /> }
                    showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity style={styles.addReminderButton} onPress={ () => navigation.navigate("Reminder")}>
                    <FontAwesome6 name="circle-plus" size={60} color="black" />
                </TouchableOpacity>                
            </View>
        </KeyboardAvoidingView>
    )
}
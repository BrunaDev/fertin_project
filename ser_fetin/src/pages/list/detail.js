import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";

import { styles } from '../../styles/list/stylesDetail';
import * as Animatable from 'react-native-animatable';

export default function DetailBook() {
    const route = useRoute();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.data ? route.params?.data.nameBook : "Detalhes do lembrete"
        })
    }, [navigation]);

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Autor: </Text>
                <Text style={styles.titleAuthor}></Text>
            </View>
            <Text style={styles.title}>Descrição:</Text> 
            <Text style={styles.titleDescription}></Text>
        
            <Animatable.Image
                animation="flipInY"
                source={require('../../../assets/logo-nouvennlib.png')}
                style={{ width: '100%'}}
                resizeMode='contain'
            />

            <Text style={styles.user}>Proprietário:</Text>

        </View>
    )
}
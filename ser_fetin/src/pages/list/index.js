import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../../styles/list/styles';
import { useNavigation } from '@react-navigation/native';


export function List({ data }) {
    const navigation = useNavigation();

      return(
        <TouchableOpacity style={styles.container} onPress={ () => navigation.navigate("")}>
            <View style={styles.info}>
                <Text style={styles.name}>{data.title}</Text>
                <Text style={styles.description}>x//x</Text>
            </View>
        </TouchableOpacity> 
    )
}
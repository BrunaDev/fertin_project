import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/addReminder/styles';

import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Reminder(){

    const navigation = useNavigation();

    async function sendReminder(){}

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={ () => navigation.navigate("Home")}>
                    <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.containerHeader}>
                <Animatable.Text animation="fadeInLeft" delay={500} style={styles.namePage}>Adicionar Lembrete</Animatable.Text>           
            
                <Text style={styles.title}>Título</Text>
                <TextInput
                   placeholder='Digite o nome do lembrete...'
                   style={styles.input}
                   //value={nameBook}
                   //onChangeText={text => setNameBook(text)}
                />

                <Text style={styles.title}>Descrição (opcional)</Text>
                <TextInput
                   placeholder='Digite uma breve descrição sobre o lembrete...'
                   style={styles.input}
                   //value={description}
                   //onChangeText={text => setDescription(text)}
                />

                <TouchableOpacity style={styles.button} onPress={ () => sendReminder()}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
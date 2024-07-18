import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/notification/styles';

/* TODO: permitir que o usuário escolha o som de notificação (usar as musicas padrão do celular) e se vai ter ou não,
permitir que o usuário escolha o tipo de vibração, se ele quiser que tenha. Ou seja, terá um botão para ativar o som, se ativado
ele libera um outro campo para escolher o toque de notificação e em baixo um botão para ativar a notificação que se ativado libera
um outro campo para escolher o tipo de vibração */
export default function NotificationSettings() {
    const navigation = useNavigation();

    const [soundEnabled, setSoundEnabled] = useState(false);
    const [soundType, setSoundType] = useState('default');
    const [vibrationEnabled, setVibrationEnabled] = useState(false);
    const [vibrationType, setVibrationType] = useState('default');

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={ () => navigation.goBack()}>
                <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            
            <View style={styles.containerHeader}>
                <Text style={styles.namePage}>Configurações de Notificação</Text>

                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Som</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={soundEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setSoundEnabled(value)}
                        value={soundEnabled}
                    />
                </View>

                {soundEnabled && (
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Tipo de Som</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={soundType === 'default' ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setSoundType(value ? 'default' : 'custom')}
                            value={soundType === 'default'}
                        />
                    </View>
                )}

                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Vibração</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={vibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setVibrationEnabled(value)}
                        value={vibrationEnabled}
                    />
                </View>

                {vibrationEnabled && (
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Tipo de Vibração</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={vibrationType === 'default' ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => setVibrationType(value ? 'default' : 'custom')}
                            value={vibrationType === 'default'}
                        />
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform,
    TextInput,
    Image,
    Alert
} from 'react-native';
import { styles } from '../../styles/user/styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Função para gerar UUID
function generateUUID() {
    var d = new Date().getTime();
    var d2 = (typeof performance !== 'undefined' && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default function User() {
    const navigation = useNavigation();

    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [placeholderName, setPlaceholderName] = useState('Criar nome de usuário');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão necessária', 'É necessário permitir o acesso à biblioteca de mídia para escolher uma foto.');
                }
            }
        })();
    }, []);    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setEmail(user.email);
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name || '');
                    setPlaceholderName(userData.name || 'Criar nome de usuário');
                    setImage(userData.image || null);
                }
            } else {
                setEmail('');
                setName('');
                setPlaceholderName('Criar nome de usuário');
                setImage(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        if (!uri) return;
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileName = generateUUID(); // Usando generateUUID() em vez de uuidv4()
            const storageRef = ref(storage, `profileImages/${fileName}`);

            await uploadBytes(storageRef, blob);

            const downloadURL = await getDownloadURL(storageRef);
            setImage(downloadURL);
            saveImage(downloadURL);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível fazer o upload da foto de perfil.');
        }
    };

    const saveImage = async (imageUri) => {
        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                await setDoc(userRef, { image: imageUri }, { merge: true });
                Alert.alert('Sucesso', 'Foto de perfil salva com sucesso.');
            } catch (error) {
                console.error('Erro ao salvar a foto no Firestore:', error);
                Alert.alert('Erro', 'Não foi possível salvar a foto de perfil.');
            }
        }
    };

    const saveName = async () => {
        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                await setDoc(userRef, { name: name }, { merge: true });
                setPlaceholderName(name);
                Alert.alert('Sucesso', 'Nome salvo com sucesso.');
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o nome.');
            }
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.navigate("Settings")}>
                <Ionicons name="return-up-back" size={30} color="black" />
            </TouchableOpacity>
            
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.addPhotoText}>Adicionar Foto</Text>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder={placeholderName}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    editable={false}
                />
                <TouchableOpacity style={styles.button} onPress={saveName}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
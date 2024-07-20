import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDP95_vDhVF-fOqk6pQt-YzokEyyJLiRkc",
    authDomain: "ser-sistema-de-seguranca-bf0ef.firebaseapp.com",
    projectId: "ser-sistema-de-seguranca-bf0ef",
    storageBucket: "ser-sistema-de-seguranca-bf0ef.appspot.com",
    messagingSenderId: "234025768719",
    appId: "1:234025768719:web:cb23c199e70bd0d1efd07a",
    measurementId: "G-VSRCJKG6XY",
    databaseURL: "https://ser-sistema-de-seguranca-bf0ef-default-rtdb.firebaseio.com/"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializa o Firestore
const db = getFirestore(app);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Inicializa o Storage
const storage = getStorage(app);

export { auth, db, database, storage };
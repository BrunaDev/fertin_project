import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDP95_vDhVF-fOqk6pQt-YzokEyyJLiRkc",
    authDomain: "234025768719",
    projectId: "234025768719",
    storageBucket: "gs://ser-sistema-de-seguranca-bf0ef.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:234025768719:android:642bb4c8f12fdb49efd07a",
    appId: "1:234025768719:ios:9cf6dfa46d931745efd07a",
    measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

//terminar de configurar
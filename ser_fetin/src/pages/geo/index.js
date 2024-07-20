import React,
{
    useEffect,
    useState,
    useRef
} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';
import { getAuth } from 'firebase/auth';
import { styles } from '../../styles/geo/styles';
import { ref, set, get } from 'firebase/database';
import { database } from '../../services/firebase.config';

const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371;
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) *
              Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000;
};

export default function Geolocalization(){
    const [location, setLocation] = useState(null);
    const [homeLocation, setHomeLocation] = useState(null);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);

    async function requestLocationPermissions(){
        const { granted } = await requestForegroundPermissionsAsync();

        if(granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    useEffect(() => {
        let subscription;
        const startWatchingPosition = async () => {
            subscription = await watchPositionAsync({
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1
            }, (response) => {
                setLocation(response);
                
                if (mapRef.current) {
                    mapRef.current.animateCamera({
                        pitch: 40,
                        center: response.coords
                    });
                }
        
                if (homeLocation) {
                    const distance = haversineDistance(response.coords, homeLocation);
                    if (distance > 10) {
                        //TODO: Aqui criamos a lógica de verificação do estado da porta
                        console.log('Você está a mais de 10 metros da localização "home"');
                    }
                }
            });
        };
        
        startWatchingPosition();
    
        return () => {
            if (subscription && typeof subscription.remove === 'function') {
                subscription.remove();
            }
        };
    }, [homeLocation]);   

    useEffect(() => {
        const loadHomeLocation = async () => {
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            const homeLocationRef = ref(database, 'users/' + userId + '/homeLocation');
            
            try {
                const snapshot = await get(homeLocationRef);
                if (snapshot.exists()) {
                    setHomeLocation(snapshot.val());
                    setIsFirstTime(false);
                }
            } catch (error) {
                console.error('Erro ao carregar localização da casa:', error);
            }
        };
    
        loadHomeLocation();
    }, []);

    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setHomeLocation({ latitude, longitude });
        setIsFirstTime(false);
    
        try {
            const auth = getAuth();
            await set(ref(database, 'users/' + auth.currentUser.uid + '/homeLocation'), {
                latitude: latitude,
                longitude: longitude
            });
            console.log('Localização da casa salva no Firebase');
        } catch (error) {
            console.error('Erro ao salvar localização da casa:', error);
        }
    };
    

    const handleMarkerPress = () => {
        setModalVisible(true);
    };

    const handleChangeHome = () => {
        setHomeLocation(null);
        setModalVisible(false);
        setIsFirstTime(true);
    };

    return(
        <View style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
                ) : (
                    location && (
                        <>
                            <MapView
                                ref={mapRef}
                                style={styles.map}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                                onPress={isFirstTime ? handleMapPress : null}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,  
                                    }}
                                />
                                {
                                    homeLocation &&
                                    <Marker
                                        coordinate={homeLocation}
                                        pinColor="blue"
                                        title="Home"
                                        onPress={handleMarkerPress}
                                    />
                                }
                            </MapView>
                            {
                                isFirstTime && (
                                    <View style={styles.overlay}>
                                        <Text style={styles.overlayText}>
                                            Por favor, defina a localização da sua casa tocando no mapa.
                                        </Text>
                                    </View>
                                )
                            }
                        </>
                    )
                )
            }
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Deseja alterar a localização da sua casa?</Text>
                        <TouchableOpacity onPress={handleChangeHome} style={styles.modalButton}>
                            <Text style={styles.buttonText}>Alterar Localização</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );    
}
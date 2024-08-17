import React, { useEffect, useState, useRef, useContext } from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator, Platform } from 'react-native';
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
import * as Notifications from 'expo-notifications';
import { LockContext } from '../houseState/LockContext';

const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) *
              Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000; // Return distance in meters
};

const Geolocalization = () => {
    const [location, setLocation] = useState(null);
    const [homeLocation, setHomeLocation] = useState(null);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notificationSent, setNotificationSent] = useState(false);
    const mapRef = useRef(null);
    
    const { isLocked } = useContext(LockContext);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
        setLoading(false);
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
            }, async (response) => {
                setLocation(response);

                if (mapRef.current) {
                    mapRef.current.animateCamera({
                        pitch: 40,
                        center: response.coords
                    });
                }

                if (homeLocation) {
                    const distance = haversineDistance(response.coords, homeLocation);
                    if (distance > 10 && !notificationSent) {
                        if (!isLocked) {
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: 'Atenção!',
                                    body: 'Identificamos que a porta não está trancada!',
                                    sound: 'default',
                                    vibrate: [0, 250, 250, 250],
                                    icon: Platform.OS === 'android' ? 'icon.png' : null,
                                    data: { data: 'goes here' }
                                },
                                trigger: { seconds: 1 }
                            });
                            console.log('Você está a mais de 10 metros da localização "home"');
                            setNotificationSent(true);
                        }
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
    }, [homeLocation, notificationSent, isLocked]);

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
        } catch (error) {
            console.error('Erro ao salvar localização da casa:', error);
            alert("Erro ao salvar localização", "Tente novamente mais tarde.");
        }
    };

    const handleMarkerPress = () => {
        setModalVisible(true);
    };

    const handleChangeHome = () => {
        setHomeLocation(null);
        setModalVisible(false);
        setIsFirstTime(true);
        setNotificationSent(false);
    };

    return (
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
};

export default Geolocalization;
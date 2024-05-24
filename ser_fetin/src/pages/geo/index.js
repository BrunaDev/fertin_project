import React, { useEffect, useState, useRef } from 'react';
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

import { styles } from '../../styles/geo/styles';

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
        const subscriber = watchPositionAsync({
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
        });

        return () => {
            subscriber && subscriber.remove();
        };
    }, []);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setHomeLocation({ latitude, longitude });
        setIsFirstTime(false);
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
                                        <Text style={styles.overlayText}>Por favor, defina a localização da sua casa tocando no mapa.</Text>
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
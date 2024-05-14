import { useEffect, useState, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';

import { styles } from '../../styles/geo/styles';

export default function Geolocalization(){
    const [location, setLocation] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView>(null);

    async function requestLocationPermissions(){
        //verifica se usuario deu permissão
        const { granted } = await requestForegroundPermissionsAsync();

        if(granted){
            //posição atual
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
            mapRef.current?.animateCamera({
                pitch: 20,
                center: response.coords
            })
        });
    }, []);

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {
                location &&
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }} />
                </MapView>
            }

            <View style={styles.containerHeader}></View>
        </KeyboardAvoidingView>
    )
}
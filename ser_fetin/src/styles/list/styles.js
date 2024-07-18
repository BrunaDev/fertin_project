import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
        flexDirection: 'row',
        position: 'relative'
    },
    images: {
        width: '100%',
        height: 100,
        borderRadius: 14,
        zIndex: 1
    },
    info: {
        position: 'absolute',
        top: '20%',
        left: 14,
        zIndex: 99
    },
    title: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
    },
    time: {
        color: "#000",
    },
    deleteButton: {
        position: 'absolute',
        top: '65%',
        right: 10,
        transform: [{ translateY: -25 }],
        zIndex: 100,
    },
});
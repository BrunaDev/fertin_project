import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginStart: 5,
        marginTop: 7,
        marginBottom: 7,
    },
    images: {
        width: '100%',
        height: 150,
        borderRadius: 14,
    },
    info:{
        position: 'absolute',
        bottom: 14,
        left: 14,
        zIndex: 99
    },
    name:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    author:{
        color: '#FFF'
    },
    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '55%',
        borderRadius: 14,
        zIndex: 1,
        backgroundColor: 'transparent'
    }
});
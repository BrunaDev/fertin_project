import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },    
    buttonReturn: {
        marginLeft: 10,
        marginTop: "10%"
    },
    namePage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    optionText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "#000",
        width: '100%',
        borderRadius: 8,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 38
    },
    buttonText: {
        color: '#FFFF',
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold'
    },
});
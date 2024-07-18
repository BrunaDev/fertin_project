import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeader: {
        flex: 1,
        flexDirection: 'column',
        margin: 15,
    },
    buttonReturn: {
        marginLeft: 10,
        marginTop: "10%"
    },
    containerRegister: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    namePage: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 25
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
    title: {
        margin: 5,
        fontSize: 18,
        color: 'black'
    },
    inputContainer: {
        borderWidth: 0.5,
        borderColor: '#000',
        marginBottom: 12,
        height: 52,
    },
    input: {
        margin: 5,
        height: 40,
        fontSize: 15,
        color: '#000'
    },
    buttonDate: {
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 40,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        marginVertical: 5,
        alignSelf: 'center',
        width: '80%',
    },
});
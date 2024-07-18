import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    button: {
        backgroundColor: "#000",
        width: '100%',
        borderRadius: 8,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },     
    input: {
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 12,
        padding: 10,
        fontSize: 15,
        color: 'black'
    },
    multilineInput: {        
        textAlignVertical: 'top',
        height: 100,
        minHeight: 100,
        maxHeight: 200,
    },
    buttonDate: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginVertical: 10,
    },
    editButtonText: {
        fontWeight: 'bold',
        color: 'blue',
    }
});
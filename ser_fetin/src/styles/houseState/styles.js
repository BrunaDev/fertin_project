import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerHeader: {
      marginTop: "10%",
      marginLeft: 15
    },
    containerPage: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },  
    containerBody: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    namePage: {
      marginTop: '14%',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000'
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    containerForm: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%'
    },
    statusText: {
      fontSize: 18,
      marginBottom: 20,
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    }
});
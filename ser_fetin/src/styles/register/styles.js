import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerHeader: {
        marginTop: "10%",
    },    
    containerBody:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
      marginTop: '10%',
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
    title: {
        fontSize: 20,
        marginTop: 24,
      },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
    },
    button: {
      backgroundColor: "#000",
      width: '100%',
      borderRadius: 8,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFF',
      fontSize: 18,
      margin: 5,
      fontWeight: 'bold'
    },
    buttonReturn: {
        marginLeft: 10,
    }
});
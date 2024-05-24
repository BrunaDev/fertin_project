import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerHeader: {
        marginTop: "10%",
        marginBottom: '8%',
        paddingStart: '5%',
    },    
    containerBody:{
      marginTop: '14%',
      marginBottom: '10%'
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    containerForm: {
      margin: 5,
      marginStart: 0,
    },
    title: { 
      fontSize: 20,
      marginTop: 28,
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
    },
    buttons: {
      width: '90%',
      paddingVertical: 8,
      marginTop: 14,
      flexDirection: 'row',
      alignItems: 'center',      
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 8,
    },
    icons: {
      marginLeft: 10
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
      margin: 2,
      fontWeight: 'bold',
      marginLeft: 30
    },
    buttonLogout: {
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: '80%'
    },
    buttonTextLogout: {
      color: '#000',
      fontSize: 16,
      margin: 2,
      fontWeight: 'bold',
    }
});
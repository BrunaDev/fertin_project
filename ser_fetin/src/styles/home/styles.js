import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerHeader: {
        marginTop: "6%",        
        flex: 1,
        marginRight: 15,
        marginLeft: 15
    },    
    containerBody:{
      marginTop: '14%',
      marginBottom: '8%',
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
      paddingVertical: 8,
      marginTop: '155%',
      marginRight: 25,
      alignItems: 'flex-end',
    },
    buttonText: {
      color: '#FFFF',
      fontSize: 18,
      margin: 5,
      fontWeight: 'bold'
    },
    buttonReturn: {
        marginLeft: 10,
    },
    addReminderButton: {
      position: 'absolute',
      right: 15,
      bottom: 25,
      zIndex: 1,
    },
});
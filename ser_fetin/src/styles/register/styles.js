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
      marginBottom: '10%',
      paddingStart: '5%',
      marginTop: '10%',
    },
    message: {
      fontSize: 36,
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
        marginTop: 15,
    },
    inputContainer: {
        borderWidth: 2,
        borderColor: '#000',
        marginBottom: 12,
        height: 52,
        marginBottom: 25
    },
    input: {
      height: 40,
      fontSize: 16,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: "#000",
      width: '100%',
      borderRadius: 8,
      paddingVertical: 8,
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
    },
    
    passwordInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: 'center',
    },
    passwordVisibilityToggle: {
        position: 'absolute',
        right: 10,
    }
});
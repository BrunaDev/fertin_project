import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    containerForm: {
        flex: 2,
    },
    containerButtons: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginStart: 25,
        marginEnd: 25,
      },
    images: {
        width: '100%',
        height: '100%',
    },
    buttonLogin: {
        borderColor: '#000',
        borderWidth: 2,
        padding: 12,
        paddingLeft: 42,
        paddingRight: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    buttonRegister: {
        backgroundColor: '#000',
        borderWidth: 2,
        padding: 12,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    loginText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
      zIndex: 1,
    },
    registerText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 1,
      }
  });
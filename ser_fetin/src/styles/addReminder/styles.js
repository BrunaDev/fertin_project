import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerHeader: {
        marginTop: "10%",
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 15,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
      },    
      button: {
          backgroundColor: "#FFF",
          width: '100%',
          borderRadius: 8,
          paddingVertical: 8,
          marginTop: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonText: {
          color: '#0CC0DF',
          fontSize: 18,
          fontWeight: 'bold'
        },      
      title: {
          fontSize: 18,
          marginTop: 28,
          color: 'black'
        },
        input: {
          borderBottomWidth: 1,
          height: 40,
          marginBottom: 12,
          fontSize: 15,
          color: '#f8f8f8'
        },
});
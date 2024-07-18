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
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      width: '80%',
  },
  buttonReturn: {
    marginLeft: 10,
    marginTop: "10%"
  },
  button: {
      backgroundColor: '#000',
      borderRadius: 5,
      padding: 12,
      width: '80%',
      alignItems: 'center',
      marginTop: 20
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
  },
  profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
  },
  addPhotoText: {
      color: '#007bff',
      fontSize: 16,
  },
  namePage: {
    fontSize: 30,
    marginBottom: 60,
    fontWeight: 'bold'
  },
  passwordInputContainer: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: 'center',
      marginTop: 20
  },
  passwordVisibilityToggle: {
      position: 'absolute',
      right: 10,
  }
});
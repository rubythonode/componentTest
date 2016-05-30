import {
  StyleSheet,
} from 'react-native';

var primaryColor = '#FFA000'
var white = 'white'

styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
  },

  containerFull: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: primaryColor,
  },

  button: {
    backgroundColor: white,
    margin: 30,
    borderColor: primaryColor,
  },
  buttonText: {
    color: primaryColor,
    fontSize: 20,
  },
  buttonWhite: {
    backgroundColor: primaryColor,
    margin: 30,
    borderColor: white,
  },
  buttonWhiteText: {
    color: white,
    fontSize: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    color: primaryColor,
    paddingLeft: 10
  }
});


export default styles

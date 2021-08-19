import React from 'react';
import {TouchableOpacity, Text, Dimensions,StyleSheet} from 'react-native';

const {height: screenHeight} = Dimensions.get('screen');

const Button = ({text, bgColour, txtColour, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: bgColour}]}>
      <Text style={[styles.buttonText, {color: txtColour}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 19.0,
    paddingVertical: screenHeight * 0.027,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#51e2f5',
  },
  buttonText: {
    fontFamily: 'Glory-LightItalic',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    height: 20,
  },
});

export default Button;

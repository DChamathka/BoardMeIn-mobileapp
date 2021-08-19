import React from 'react'
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Log from './LogScreen';
import Button from '../components/Button';
const backgroundImage = require('../../assest/images/Log-Background.jpg');
const logoImage = require('../../assest/images/logo.jpg');

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const LandingScreen = ({navigation}) => {
  const nextScreen = () => {
    navigation.navigate(Log.name);
  };

  return (
    <>
      <Image style={styles.backgroundImage} source={backgroundImage} />
      <View style={styles.footer}>
        <Image style={styles.logoImage} source={logoImage} />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}> Board Me In</Text>
        <View style={{marginTop: screenHeight * 0.1}} />
        <Button
          onPress={() => nextScreen()}
          bgColour="#51e2f5"
          txtColour="#fff"
          text="Get Started"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.073,
    paddingBottom: screenHeight * 0.057,
  },
  logoImage: {
    marginBottom: screenHeight * 0.039,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Italic-VariableFont_wght',
    fontWeight: '900',
    fontSize: 60,
    lineHeight: 75,
    height: 60,
    color: '#000',
    textAlign: 'center',
  },
});

export default {component: LandingScreen, name: 'LandingScreen'};

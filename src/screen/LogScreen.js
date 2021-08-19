import React from 'react';
import {View, Image, Text, Dimensions,StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import OwnerSignUp from '../screen/Owner/OwnerSignUp';
import OwnerSignIn from '../screen/Owner/OwnerSignIn';
import GuestSignIn from '../screen/Guest/GuestSignIn';
import GuestSignUp from '../screen/Guest/GuestSignUp';
const backgroundImage = require('../../assest/images/background.jpg');

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const Log = ({navigation}) => {
  const OSScreen = () => {
    navigation.navigate(OwnerSignUp.name);
  };
  const OSIScreen = () => {
    navigation.navigate(OwnerSignIn.name);
  };
  const GSIScreen = () => {
    navigation.navigate(GuestSignIn.name);
  };
  const GSScreen = () => {
    navigation.navigate(GuestSignUp.name);
  };
  return (
    <>
      <Image style={styles.backgroundImage} source={backgroundImage} />
      <View style={styles.container}>
        <Text style={styles.title}>Are You a Property Owner ?</Text>
        <Button
          onPress={() => OSIScreen()}
          bgColour="#00DDFF"
          txtColour="#000"
          text="Sign In"
        />
        <Text style={styles.subtitle}>Haven't Account</Text>
        <Button
          onPress={() => OSScreen()}
          bgColour="#51e2f5"
          txtColour="#000"
          text="Sign Up"
        />
        <Text style={styles.title}>Are You Finding a Property ?</Text>
        <Button
          onPress={() => GSIScreen()}
          bgColour="#00DDFF"
          txtColour="#000"
          text="Sign In"
        />
        <Text style={styles.subtitle}>Haven't Account</Text>
        <Button
          onPress={() => GSScreen()}
          bgColour="#51e2f5"
          txtColour="#000"
          text="Sign Up"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    resizeMode: 'cover',
  },
  container: {
    position: 'absolute',
    width: screenWidth,
    alignItems: 'flex-start',
    paddingHorizontal: screenWidth * 0.073,
    paddingBottom: screenHeight * 0.057,
    paddingTop: screenHeight * 0.057,
  },
  logoImage: {
    marginBottom: screenHeight * 0.039,
  },
  title: {
    marginTop: screenHeight * 0.021,
    marginBottom: screenHeight * 0.045,
    fontFamily: 'Gilroy-ExtraBold',
    color: '#06170e',
    fontSize: 25,
    lineHeight: 25,
  },
  subtitle: {
    marginTop: screenHeight * 0.021,
    marginBottom: screenHeight * 0.021,
    fontFamily: 'Gilroy-MediumItalic',
    color: '#000000',
    fontSize: 15,
    lineHeight: 17,
  },
});
export default {component: Log, name: 'Log'};

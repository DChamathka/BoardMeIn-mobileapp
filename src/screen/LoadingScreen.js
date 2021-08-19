import React from 'react';
import {ActivityIndicator,Image,View, StyleSheet, Dimensions} from 'react-native';
const logoImage = require('../../assest/images/logo.jpg');

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const LoadingScreen = () => {
  return (
    <View alignItems="center">
        <Image style={styles.logoImage} source={logoImage} />
        <ActivityIndicator size="large" color='#51e2f5'/>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    marginBottom: screenHeight * 0.039,
  },
});
export default {component: LoadingScreen, name: 'LoadingScreen'};

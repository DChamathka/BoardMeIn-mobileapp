import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  Spinner from 'react-native-spinkit'

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  
  const nav =(val)=>{
      if (val === null){
          navigation.replace('Auth')
      } else if (val === '3'){
          navigation.replace('Guest')
      } else{
          navigation.replace('Owner')
      }
  }
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('role').then((value) =>
        nav(value)
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Board Me In</Text>
      <Image
        source={require('../../assest/images/logo.jpg')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
    <Spinner style={styles.spinner} isVisible={true} size={80} type='ThreeBounce' color='#51e2f5'/>
    </View>
  );
};

export default {component:SplashScreen, name: 'SplashScreen'};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Spinner: {
    alignItems: 'center',
    padding: 10,
    height: 100,
  },
  text: {
    fontFamily: 'PlayfairDisplay-Italic-VariableFont_wght',
    fontWeight: '900',
    fontSize: 60,
    lineHeight: 75,
    height: 60,
    color: '#000',
    textAlign: 'center',
  },
});
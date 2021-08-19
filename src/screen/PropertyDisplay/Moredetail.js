import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configdata from '../../config/config';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const Moredetail = ({route, navigation}) => {
  const pid = route.params.pid;
  const price = route.params.price;
  const type = route.params.type;
  const location = route.params.location;
  const discription = route.params.description;
  const img = route.params.pimg;
  const content = route.params.content;
  const [d, setD] = useState([]);
  const [rate, setRate] = useState(0);

  const setProduct = () => {
    const abortController = new AbortController();
    const signal = AbortController.signal;
    fetch(`${configdata.baseURL}/properties/property/${pid}`, {signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        setD(responseJson.data);
      })
      .catch(error => {
        console.error(error);
      });

    fetch(`${configdata.baseURL}/rate/${pid}`, {signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        setRate(responseJson.average);
      })
      .catch(error => {
        console.error(error);
        setRate(0);
      });
    return function cleanup() {
      abortController.abort();
    };
  };

  const book = () => {
    navigation.navigate('Property', {
      screen: 'Book',
      params: {
        img: d.images.url,
        price: d.price,
        type: d.category,
        location: d.location,
        content: d.content,
      },
    });
  };

  const comment = () => {
    navigation.navigate('Property', {
      screen: 'AddComment',
      params: {
        pid: pid,
      },
    });
  };

  useEffect(() => setProduct(), []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginHorizontal: 10}}>
          <Image style={styles.productImg} source={{uri: img}} />
          <Text style={styles.price}>
            {'Rs. '}
            {price}
          </Text>
          <Text style={styles.description}>{discription}</Text>
          <Text style={styles.description}>{content}</Text>
        </View>
        <View style={styles.starContainer}>
          <Stars
            default={rate}
            count={5}
            spacing={4}
            starSize={50}
            disabled={true}
            fullStar={require('../../../assest/images/starFull.png')}
            emptyStar={require('../../../assest/images/starEmpty.png')}
          />
        </View>
        <TouchableOpacity
          style={[styles.Button, styles.btnclr1]}
          onPress={() => navigation.navigate('ChatA', {screen: 'Chat'})}>
          <Text style={styles.ButtonText}>
            Contact Owner <Icon name="chat" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styles.btnclr2]}>
          <Text style={styles.ButtonText} onPress={() => book()}>
            Book Now <Icon name="check-outline" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, styles.btnclr3]}
          onPress={() => comment()}>
          <Text style={styles.ButtonText}>
            Comment & Review{' '}
            <Icon name="comment-edit-outline" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, styles.btnclr5]}
          onPress={() =>
            navigation.navigate('Property', {screen: 'GoogleMap'})
          }>
          <Text style={styles.ButtonText}>
            View Location{' '}
            <Icon name="map-marker-radius-outline" size={25} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default {component: Moredetail, name: 'Moredetail'};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    alignItems: 'center',
    paddingTop: heightScreen * 0.001,
    paddingBottom: 10,
  },
  productImg: {
    width: widthScreen * 0.9,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  Button: {
    width: '90%',
    borderRadius: 15.0,
    paddingVertical: heightScreen * 0.017,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightScreen * 0.007,
  },
  btnclr1: {
    backgroundColor: '#51e2f5',
  },
  btnclr2: {
    backgroundColor: '#0028c9',
  },
  btnclr3: {
    backgroundColor: '#bd00de',
  },
  btnclr4: {
    backgroundColor: '#059100',
  },
  btnclr5: {
    backgroundColor: '#db9a00',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#969696',
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  ButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configdata from '../../config/config';
import Loader from '../../components/Loader';
const payHereImg = require('../../../assest/images/payHerelogo.png');
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
import Payhere from '@payhere/payhere-mobilesdk-reactnative';

const Book = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState([]);
  const img = route.params.img;
  const price = route.params.price;
  const type = route.params.type;
  const location = route.params.location;
  const content = route.params.content;

  const getDetails = async () => {
    const id = await AsyncStorage.getItem('@guser');
    setLoading(true);
    const abortController = new AbortController();
    const signal = AbortController.signal;
    console.log(id);
    fetch(`${configdata.baseURL}/profile/${id}`, {signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        setOwner(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    return function cleanup() {
      abortController.abort();
    };
  };

  const paymentObject = {
    sandbox: true, // true if using Sandbox Merchant ID
    merchant_id: '1216780', // Replace your Merchant ID
    merchant_secret: '4TnexFXe6h64p72LTmR0l74qBrXRmLDLn4kqm8a64bzN', // See step 4e
    notify_url: 'http://sample.com/notify',
    order_id: 'ItemNo12345',
    items: 'Hello from React Native!',
    amount: price,
    currency: 'LKR',
    first_name: owner.firstname,
    last_name: owner.lastname,
    email: owner.email,
    phone: '',
    address: content,
    city: location,
    country: 'Sri Lanka',
    delivery_address: '',
    delivery_city: '',
    delivery_country: 'Sri Lanka',
    custom_1: '',
    custom_2: '',
  };

  const handlePaymet = () => {
    try {
      Payhere.startPayment(
        paymentObject,
        paymentId => {
          console.log(paymentId);
        },
        error => {
          console.log('Error', error);
        },
        () => {
          console.log('Ignored');
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getDetails(), []);

  return (
    <>
      <Loader loading={loading} />
      <View style={styles.container}>
        <Text style={styles.title}>Billing Details</Text>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={styles.subtitle}>Payer's Name</Text>
          <View style={styles.valuecontainer}>
            <Text style={styles.value}>
              {owner.firstname} {owner.lastname}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Property type</Text>
          <View style={styles.valuecontainer}>
            <Text style={styles.value}>{type}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Property address</Text>
          <View style={styles.valuecontainer}>
            <Text style={styles.value}>{content}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Payment</Text>
          <View style={styles.valuecontainer}>
            <Text style={styles.value}>{price}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handlePaymet}>
            <Image style={styles.image} source={payHereImg} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    paddingTop: heightScreen * 0.001,
    paddingBottom: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.05,
  },
  line: {borderBottomColor: '#232323', borderBottomWidth: 4, paddingTop: 10},
  row: {
    alignItems: 'flex-start',
    padding: 10,
  },
  image: {
    width: 150,
    height: 50,
  },
  title: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 25,
    color: '#004',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#323232',
  },
  valuecontainer: {
    borderWidth: 2,
    borderColor: '#004',
    width: widthScreen * 0.9,
    padding: 10,
    marginTop: 10,
  },
});

export default {component: Book, name: 'Book'};

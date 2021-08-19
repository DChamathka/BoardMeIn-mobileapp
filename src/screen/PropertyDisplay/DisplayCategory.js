import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';
import SingleRoom from '../../../assest/images/SingleRoom.jpg';
import sharedroom from '../../../assest/images/Sharedroom.jpg';
import Apartments from '../../../assest/images/Apartment.jpg';
import annex from '../../../assest/images/annex.jpg';
import configdata from '../../config/config';
import Loader from '../../components/Loader';

import SingleRoomDashboard from './SingleRoomDashboard';
import SharedRoomDashboard from './SharedRoomDashboard';
import AnnexDashboard from './AnnexDashboard';
import HouseDashboard from './HouseDashboard';
import Category from '../../components/Category';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const DisplayCategory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [srcount, setSrcount] = useState();
  const [shcount, setShcount] = useState();
  const [anxcount, setAnxcount] = useState();
  const [hmcount, setHmcount] = useState();

  const abortController = new AbortController();
  const signal = AbortController.signal;

  const getSinCount = () => {
    setLoading(true);
    fetch(`${configdata.baseURL}/properties/sroom`, {signal: signal})
      .then(res => res.json())
      .then(responseJson => {
        console.log(responseJson);
        setSrcount(responseJson.sincount);
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

  const getShrCount = () => {
    fetch(`${configdata.baseURL}/properties/shroom`, {signal: signal})
      .then(res => res.json())
      .then(responseJson => {
        console.log(responseJson);
        setShcount(responseJson.shrrcount);
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

  const getAnxCount = () => {
    fetch(`${configdata.baseURL}/properties/annex`, {signal: signal})
      .then(res => res.json())
      .then(responseJson => {
        console.log(responseJson);
        setAnxcount(responseJson.annexcount);
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

  const getHomeCount = () => {
    fetch(`${configdata.baseURL}/properties/house`, {signal: signal})
      .then(res => res.json())
      .then(responseJson => {
        console.log(responseJson);
        setHmcount(responseJson.housecount);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
    return function cleanup() {
      abortController.abort();
    };
  };

  const showSinglerooms = () => {
    navigation.navigate(SingleRoomDashboard);
  };
  const showSharedrooms = () => {
    navigation.navigate(SharedRoomDashboard);
  };
  const showAnnexes = () => {
    navigation.navigate(AnnexDashboard);
  };
  const showHouses = () => {
    navigation.navigate(HouseDashboard);
  };

  useEffect(() => {
    getSinCount();
    getShrCount();
    getAnxCount();
    getHomeCount();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => showSinglerooms()}>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={SingleRoom} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>Single Room</Text>
                  <Text style={styles.time}>{srcount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showSharedrooms()}>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={sharedroom} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>Shared Room</Text>
                  <Text style={styles.time}>{shcount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showHouses()}>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={Apartments} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>Rent Houses</Text>
                  <Text style={styles.time}>{hmcount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showAnnexes()}>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={annex} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>Other rent places</Text>
                  <Text style={styles.time}>{anxcount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    alignItems: 'center',
    paddingHorizontal: widthScreen * 0.02,
    paddingTop: heightScreen * 0.01,
  },
  list: {
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 1,
  },
  card: {
    margin: 0,
    borderRadius: 2,
    borderBottomWidth: 5,
    borderColor: '#DCDCDC',
    backgroundColor: '#DCDCDC',
  },
  cardContent: {
    paddingHorizontal: heightScreen * 0.027,
    height: 50,
    width: widthScreen,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  cardImage: {
    height: heightScreen * 0.2,
    width: widthScreen * 0.9,
  },
  time: {
    fontSize: 23,
    color: '#323232',
    fontFamily: 'Gilroy-BoldItalic',
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    lineHeight: 45,
    height: 40,
    fontFamily: 'Gilroy-BoldItalic',
    marginBottom: heightScreen * 0.017,
    color: '#000',
  },
});

export default {component: DisplayCategory, name: 'DisplayCategory'};

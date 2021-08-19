import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import configdata from '../../config/config';
import OwnerPropView from './OwnerPropView';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const OwnerProfile = ({navigation}) => {
  const [ouser, setOUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
    pic: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const viewProp = () => {
    navigation.navigate('OwnerPropView', {
      id: ouser._id,
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem('@ouser');
    const id = JSON.parse(jsonValue);
    fetch(`${configdata.baseURL}/ownerprofile/${id}`)
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        const data = responseJson.data;
        console.log(data.email);
        setOUser({
          ...ouser,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          _id: data._id,
          pic: data.pic,
          location: data.location,
          bio: data.bio,
        });
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <Loader loading={loading} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Profile
            username={ouser.firstname + ' ' + ouser.lastname}
            usermail={ouser.email}
            owner="Owner"
            btn2="View my rent properties"
            onPress1={() => navigation.navigate('ChatA', {screen: 'Chat'})}
            onPress2={() => viewProp()}
            img={ouser.pic}
            bio={ouser.bio}
            location={ouser.location}
            nav={() =>
              navigation.navigate('Owner', {
                screen: 'OEditProfile',
                params: {
                  firstname: ouser.firstname,
                  lastname: ouser.lastname,
                  email: ouser.email,
                  _id: ouser._id,
                  pic: ouser.pic,
                  location: ouser.location,
                  bio: ouser.bio,
                },
              })
            }
            onPress3={() =>
              navigation.navigate('AInquiry', {
                screen: 'Inquiry',
                params: {_id: ouser._id},
              })
            }
            iname="home-city"
          />
        </View>
      </SafeAreaView>
    </>
  );
};
//
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: widthScreen,
    height: heightScreen,
    alignItems: 'flex-start',
    paddingTop: heightScreen * 0.057,
    backgroundColor: '#9EFE',
  },
});

export default {component: OwnerProfile, name: 'OwnerProfile'};

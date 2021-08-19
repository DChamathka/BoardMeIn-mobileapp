import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import configdata from '../../config/config';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const GuestProfile = ({navigation}) => {
  const [guser, setGUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    _id: '',
    pic: '',
    location: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('@guser');
    fetch(`${configdata.baseURL}/profile/${id}`)
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        const data = responseJson.data;
        setGUser({
          ...guser,
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
            username={guser.firstname + ' ' + guser.lastname}
            usermail={guser.email}
            owner="Lodger"
            btn2="View Bookings"
            onPress1={() => navigation.pop()}
            img={guser.pic}
            bio={guser.bio}
            location={guser.location}
            nav={() =>
              navigation.navigate('GProfile', {
                screen: 'GEditProfile',
                params: {
                  firstname: guser.firstname,
                  lastname: guser.lastname,
                  email: guser.email,
                  _id: guser._id,
                  pic: guser.pic,
                  location: guser.location,
                  bio: guser.bio,
                },
              })
            }
            onPress3={() =>
              navigation.navigate('AInquiry', {
                screen: 'Inquiry',
                params: {_id: guser._id},
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: widthScreen,
    height: heightScreen,
    alignItems: 'flex-start',
    paddingTop: heightScreen * 0.057,
    backgroundColor: '#9EFEB4',
  },
});

export default GuestProfile;

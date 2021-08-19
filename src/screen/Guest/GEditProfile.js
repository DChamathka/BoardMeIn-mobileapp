import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import isEmpty from 'validator/lib/isEmpty';
import Profile from '../../components/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profilepic from '../../../assest/images/profile.png';
import Loader from '../../components/Loader';
import configdata from '../../config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const GEditProfile = ({navigation, route}) => {
  const [firstname, setFirstname] = useState(route.params.firstname);
  const [lastname, setLastname] = useState(route.params.lastname);
  const [pic, setPic] = useState(route.params.pic);
  const [location, setLocation] = useState(route.params.location);
  const [bio, setBio] = useState(route.params.bio);
  const [loading, setLoading] = useState(false);
  const id = route.params._id;
  const email = route.params.email;

  const handleEdit = () => {
    setLoading(true);
    if (
      firstname === route.params.firstname &&
      lastname === route.params.lastname &&
      location === route.params.location &&
      bio === route.params.bio &&
      pic === route.params.pic
    ) {
      Alert.alert('You did not change details to update');
      setLoading(false);
      return;
    } else {
      if (
        firstname !== route.params.firstname ||
        lastname !== route.params.lastname
      ) {
        fetch(`${configdata.baseURL}/profile/username/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
          }),
        });
      }
      if (location !== route.params.location) {
        fetch(`${configdata.baseURL}/profile/location/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: location,
          }),
        });
      }
      if (bio !== route.params.bio) {
        fetch(`${configdata.baseURL}/profile/bio/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bio: bio,
          }),
        });
      }
      if (pic !== route.params.pic) {
        fetch(`${configdata.baseURL}/profile/updatepic/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pic: pic,
          }),
        });
      }
      setLoading(false);
      console.log('Updated successfully');
      Alert.alert('Updated successfully');
    }
    setLoading(false);
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        setPic(response.uri);
      }
    });
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <Loader loading={loading} />
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.avatar} source={pic ? {uri: pic} : null} />
              <TouchableOpacity onPress={selectImage}>
                <Icon
                  name="plus"
                  size={45}
                  color="#000"
                  style={{
                    borderWidth: 1,
                    borderColor: '#232323',
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <StatusBar backgroundColor="#9df9ef" barStyle="light-content" />
            <KeyboardAvoidingView>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={firstname => setFirstname(firstname)}
                value={firstname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={lastname => setLastname(lastname)}
                value={lastname}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                editable={false}
                autoCapitalize="none"
                value={email}
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={location => setLocation(location)}
                value={location}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={styles.input}
                onChangeText={bio => setBio(bio)}
                value={bio}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleEdit()}>
                <Text style={styles.btntxt}>Update</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  container2: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    marginVertical: 50,
  },
  image: {
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: widthScreen,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
  },
  inputLabel: {
    fontSize: 20,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#444444',
  },
  headerTitle: {
    fontSize: 35,
    lineHeight: 35,
    height: 40,
    fontFamily: 'Gilory-Regualr',
    marginBottom: heightScreen * 0.017,
    color: '#000',
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    paddingVertical: heightScreen * 0.012,
    borderBottomWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
  },
  errtxt: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  termsBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: heightScreen * 0.033,
  },
  infoText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-Regular',
    fontWeight: '900',
    fontSize: 14,
    color: '#000',
    letterSpacing: 2,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    marginTop: heightScreen * 0.057,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightScreen * 0.028,
  },
  greenInfoText: {
    color: '#00a100',
    marginLeft: 5.0,
  },
  buttonText: {
    fontFamily: 'Gilroy-LightItalic',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    height: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#6272E9',
  },
  btntxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'justify',
    padding: 2,
  },
});

export default {component: GEditProfile, name: 'GEditProfile'};

import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Keyboard,
  Input,
  KeyboardAvoidingView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import isEmpty from 'validator/lib/isEmpty';
import configdata from '../../config/config';
import * as ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Loader from '../../components/Loader';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const EditPlace = ({route, navigation}) => {
  const oid = route.params.oid;
  const pid = route.params.pid;
  const pr = route.params.price.toString();
  const [location, setLocation] = useState(route.params.location);
  const [lang, setlang] = useState(route.params.lang);
  const [lat, setLat] = useState(route.params.lat);
  const [description, setDescription] = useState(route.params.description);
  const [price, setPrice] = useState(pr);
  const [content, setContent] = useState(route.params.content);
  const [title, setTitle] = useState(route.params.title);
  const [filePath, setFilePath] = useState(route.params.images);
  const [imageSource, setImageSource] = useState(null);
  const [loading, setLoading] = useState(false);

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
        // ADD THIS
        setImageSource(response);
        uploadImage(response);
        //console.log(response);
      }
    });
  }
  const createFormData = imageSource => {
    const data = new FormData();
    data.append('images', {
      name: imageSource.fileName,
      type: imageSource.type,
      uri:
        Platform.OS === 'android'
          ? imageSource.uri
          : imageSource.uri.replace('file://', ''),
    });
    return data;
  };

  const uploadImage = imageSource => {
    fetch(`${configdata.baseURL}/upload`, {
      method: 'POST',
      body: createFormData(imageSource),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        setFilePath(response);
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  const updateData = imageSource => {
    if (
      isEmpty(location) ||
      isEmpty(description) ||
      isEmpty(price) ||
      isEmpty(title) ||
      isEmpty(content)
    ) {
      Alert.alert('You cant set fields empty');
      return;
    } else if (
      description === route.params.description &&
      price === route.params.price &&
      location === route.params.location &&
      content === route.params.content &&
      title === route.params.title &&
      imageSource === route.params.imageSource
    ) {
      Alert.alert('You did not change details to update');
      setLoading(false);
      return;
    } else {
      setLoading(true);
      fetch(`${configdata.baseURL}/properties/updateproperty/${pid}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          price: price,
          location: location,
          content: content,
          title: title,
          images: filePath,
          lat: lat,
          lang: lang,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson');
          if (responseJson.success) {
            Alert.alert('Updated data successfully');
            setLoading(false);
            navigation.pop();
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
      setLoading(false);
    }
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Update property</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: filePath.url}}
              style={styles.imageBox}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={selectImage}
              style={[
                styles.selectButtonContainer,
                {backgroundColor: '#999999'},
              ]}>
              <Text style={styles.selectButtonTitle}>Add photo</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.form}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={title => setTitle(title)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
                value={title}
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                onChangeText={location => setLocation(location)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
                value={location}
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={content => setContent(content)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
                value={content}
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.minput}
                multiline
                numberOfLines={4}
                onChangeText={description => setDescription(description)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
                placeholder="Features or other details"
                value={description}
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={price => setPrice(price)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
                value={price}
                keyboardType="numeric"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={() => updateData(imageSource)}>
                <Text style={{color: '#fff'}}>Update</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

export default {component: EditPlace, name: 'EditPlace'};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 20,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#444444',
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    paddingVertical: heightScreen * 0.012,
    borderWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
    width: widthScreen * 0.9,
  },
  userRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: heightScreen * 0.057,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 6,
  },
  minput: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    borderWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
    width: widthScreen * 0.9,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  flex: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
  },
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    marginLeft: 10,
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18,
  },
  // ADD BELOW
  imageContainer: {
    borderWidth: 3,
    width: widthScreen * 0.6,
    padding: 5,
    marginBottom: 10,
  },
  imageBox: {
    width: widthScreen * 0.5,
    height: 150,
  },
  uploadBtn: {
    padding: 10,
    margin: 10,
    backgroundColor: '#00f',
  },
  title: {
    fontFamily: 'Gilroy-Heavy',
    fontSize: 28,
  },
});

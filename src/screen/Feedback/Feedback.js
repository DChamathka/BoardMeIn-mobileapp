import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {validate} from 'validate.js';
import configdata from '../../config/config';
import Loader from '../../components/Loader';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const Feedback = ({navigation, route}) => {
  const pid = route.params.pid;
  const [data, setData] = useState([]);
  const getData = () => {
    try {
      fetch(`${configdata.baseURL}/comment/${pid}`)
        .then(response => response.json())
        .then(responseJson => {
          setData(responseJson.comments);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      keyExtractor={item => {
        return item._id;
      }}
      renderItem={item => {
        const comment = item.item;
        return (
          <View style={styles.container}>
            <View style={styles.contentHeader}>
              <Text style={styles.name}>{comment.gName}</Text>
            </View>
            <View style={styles.starContainer}>
              <Stars
                default={comment.pRating}
                count={5}
                spacing={4}
                update={oval => {
                  setOVal(oval);
                }}
                starSize={25}
                fullStar={require('../../../assest/images/starFull.png')}
                emptyStar={require('../../../assest/images/starEmpty.png')}
              />
              <Text rkType="primary3 mediumLine">{comment.comment}</Text>
              <TouchableOpacity style={styles.button}>
                <Text>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
  },
  rateView: {
    margin: 5,
    width: widthScreen * 0.9,
    borderRadius: 10,
  },
  commentcard: {
    backgroundColor: 'rgba(23, 23, 23, 0.6)',
    borderRadius: 10,
    width: widthScreen * 0.95,
    alignItems: 'center',
    padding: 10,
  },
  commentcard2: {
    backgroundColor: '#aaaaaa',
    borderRadius: 10,
    width: widthScreen * 0.95,
    alignItems: 'flex-start',
    padding: 10,
  },
  txt: {
    fontSize: 25,
    paddingLeft: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    color: '#fff',
    fontSize: 20,
    padding: 5,
    margin: 15,
    textAlign: 'left',
  },
  iconview: {
    alignItems: 'flex-end',
    width: widthScreen * 0.85,
    padding: 5,
  },
  btn: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  container2: {
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    backgroundColor: '#aaaaaa',
    padding: 5,
    width: widthScreen,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 6,
    marginLeft:6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: widthScreen,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    width: widthScreen * 0.2,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default {component: Feedback, name: 'Feedback'};

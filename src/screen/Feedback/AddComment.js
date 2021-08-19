import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {LogBox} from 'react-native';
import configdata from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const AddComment = ({navigation, route}) => {
  const pid = route.params.pid;
  const [val, setVal] = useState('');
  const [oval, setOVal] = useState('');
  const [user, setUser] = useState('');
  const [cmt, setCmt] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const send = async () => {
    setLoading(true);
    try {
      await fetch(`${configdata.baseURL}/comment`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: pid,
          gId: user._id,
          gName: user.firstname + ' ' + user.lastname,
          pRating: val,
          oRating: oval,
          comment: cmt,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          setLoading(false);
          Alert.alert('BoardMeIn', 'Your review posted', [
            {text: 'OK', onPress: () => navigation.pop()},
          ]);
        });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const getData = async () => {
    const gid = await AsyncStorage.getItem('@guser');
    try {
      fetch(`${configdata.baseURL}/profile/${gid}`)
        .then(response => response.json())
        .then(responseJson => {
          setUser(responseJson.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }

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
  if(!data.gName){
    return <View><Text>No any review</Text></View>
  }
  return (
    <ScrollView>
      <Loader loading={loading} />
      <View style={styles.container}>
        <View style={styles.commentcard}>
          <View style={styles.rateView}>
            <Text style={styles.txt}>Rate accommodation</Text>
            <Stars
              default={0}
              count={5}
              spacing={4}
              update={val => {
                setVal(val);
              }}
              starSize={50}
              fullStar={require('../../../assest/images/starFull.png')}
              emptyStar={require('../../../assest/images/starEmpty.png')}
            />
            <Text style={styles.txt}>Rate accommodation owner</Text>
            <Stars
              default={0}
              count={5}
              spacing={4}
              update={oval => {
                setOVal(oval);
              }}
              starSize={50}
              fullStar={require('../../../assest/images/starFull.png')}
              emptyStar={require('../../../assest/images/starEmpty.png')}
            />
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              placeholderTextColor="#BFC9CA"
              onChangeText={cmt => setCmt(cmt)}
            />
            <View style={styles.iconview}>
              <Icon.Button
                name="send"
                color="#fff"
                size={28}
                style={styles.btn}
                onPress={() => send()}
              />
            </View>
          </View>
        </View>
        <View style={styles.commentcard2}>
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
                <>
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
                </>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    height: heightScreen,
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

export default {component: AddComment, name: 'AddComment'};

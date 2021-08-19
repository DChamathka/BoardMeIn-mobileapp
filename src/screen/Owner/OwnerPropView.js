import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/Loader';

import configdata from '../../config/config';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

const OwnerPropView = ({props, navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [propty, setPropty] = useState([]);
  const [visible, setVisible] = useState(false);
  const [conform, setConform] = useState(false);
  const hideDialog = () => setVisible(false);
  const oid = route.params.id;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    setLoading(true);
    try {
      const abortController = new AbortController();
      const signal = AbortController.signal;

      fetch(`${configdata.baseURL}/properties/ownerproperty/${oid}`, {
        signal: signal,
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data);
          setPropty(responseJson.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
      return function cleanup() {
        abortController.abort();
      };
    } catch (error) {
      console.log(error);
    }
  };

  const ItemView = ({item}) => {
    const img = item.images.url;

    const updatePlace = () => {
      navigation.navigate('Owner', {
        screen: 'EditPlace',
        params: {
          oid: oid,
          pid: item._id,
          location: item.location,
          content: item.content,
          price: item.price,
          description: item.description,
          images: item.images,
          title: item.title,
          lat: item.lat,
          lang: item.lang,
        },
      });
    };
    /*  */
    const conformDelete = id => {
      Alert.alert(
        'BoardMeIn',
        'Are you sure, you want to delete',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Delete'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => deletePlace(id)},
          setLoading(true),
        ],
        {cancelable: false},
      );
      setLoading(false);
    };

    const deletePlace = id => {
      const a = id;
      try {
        fetch(`${configdata.baseURL}/properties/deleteproperty/${a}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.success) {
              Alert.alert('Deleted data successfully.');
              navigation.pop();
            }
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {}
    };

    const viewComment = () => {
      navigation.navigate('Owner', {
        screen: 'Feedback',
        params: {pid: item._id},
      });
    };

    return (
      // Flat List Item
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri: img}} />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.description}>{item.content}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {'Rs.'}
                {item.price}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.socialBarContainer}>
            <View style={styles.socialBarSection}>
              <Text style={styles.socialBarLabel} onPress={() => updatePlace()}>
                <Icon name="pencil" size={25} color="#202020" /> Edit
              </Text>
            </View>
            <View style={styles.socialBarSection}>
              <Text
                style={styles.socialBarLabel}
                onPress={() => conformDelete(item._id)}>
                <Icon name="delete" size={25} color="#202020" /> Delete
              </Text>
            </View>
            <View style={styles.socialBarSection}>
              <Text
                style={styles.socialBarLabel}
                onPress={() => viewComment()}>
                <Icon name="comment-text-multiple" size={25} color="#202020" /> Reviews
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.9,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <>
      <Loader loading={loading} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.btntxt}
              onPress={() =>
                navigation.navigate('Owner', {
                  screen: 'AddPlace',
                  params: {
                    oid: oid,
                  },
                })
              }>
              <Icon name="plus" size={30} color="#00f" />
              Add new property
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#323232',
            borderBottomWidth: 1,
          }}
        />
        <Text style={styles.btntxt}>{'  '}Previous ones</Text>
        <View style={{flex: 1, paddingBottom: 1}}>
          <FlatList
            data={propty}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={false}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    marginLeft: 1,
    backgroundColor: 'white',
  },
  cardHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: '#EEEEEE',
  },
  cardImage: {
    flex: 1,
    height: 200,
    width: null,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 18,
    color: '#555',
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  btntxt: {
    fontSize: 25,
    fontFamily: 'PlayfairDisplay-Italic-VariableFont_wght',
    color: '#000',
  },
});
export default {component: OwnerPropView, name: 'OwnerPropView'};

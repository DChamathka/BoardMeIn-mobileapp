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
  Dimensions,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import configdata from '../../config/config';
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

import Moredetail from './Moredetail';

const AnnexDashboard = ({props, navigation}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [filterdata, setFilterdata] = useState([]);
  const [sortdata, setSortdata] = useState([
    {label: 'Price High-Low', value: 'h-l'},
    {label: 'Price Low-High', value: 'l-h'},
  ]);


  useEffect(() => getData(), []);

  const getData = () => {
    const abortController = new AbortController();
    const signal = AbortController.signal;

    setLoading(true);
    fetch(`${configdata.baseURL}/properties/annexes`, {signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        setData(responseJson.data);
        setFilterdata(responseJson.data);
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

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.location
          ? item.location.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        c;
      });
      setFilterdata(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilterdata(data);
      setSearch(text);
    }
  };

  const filter = value => {
    console.log(value);
    if (value === 'l-h') {
      const newData = data.sort(function (a, b) {
        return a.price - b.price;
      });
      setFilterdata(newData);
    } else if (value === 'h-l') {
      const newData = filterdata.sort(function (a, b) {
        return b.price - a.price;
      });
      setFilterdata(newData);
    }
  };

  const ItemView = ({item}) => {
    const img = item.images.url;

    return (
      // Flat List Item
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{uri: img}} />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.description}>{item.location}</Text>
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
              <Text style={styles.socialBarLabel} onPress={() => book()}>
                Book now
              </Text>
            </View>
            <View style={styles.socialBarSection}>
              <Text
                style={styles.socialBarLabel}
                onPress={() => moreDetail(item)}>
                More details...
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
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const moreDetail = item => {
    navigation.navigate('Moredetail', {
      pid: item._id,
      type: item.category,
      price: item.price,
      location: item.location,
      description: item.description,
      pimg: item.images.url,
      content: item.content,
    });
  };

  const book = item => {
    navigation.navigate('Property', {
      screen: 'Book',
      params: {
        pid: item._id,
        type: item.category,
        price: item.price,
        location: item.location,
        description: item.description,
        pimg: item.images.url,
        content: item.content,
      },
    });
  };

  if (!data) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.name}>No any property to view</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.userRow}>
            <SearchBar
              round
              searchIcon={{size: 24}}
              onChangeText={text => searchFilterFunction(text)}
              onClear={text => searchFilterFunction('')}
              placeholder="Find by location"
              value={search}
              containerStyle={styles.srchbar}
            />
            <RadioForm
              style={styles.radioButton}
              radio_props={sortdata}
              initial={-1}
              buttonSize={10}
              formHorizontal={false}
              labelHorizontal={true}
              labelStyle={{color: '#fff'}}
              buttonColor={'#fff'}
              onPress={value => {
                setValue(value);
                filter(value);
              }}
            />
          </View>
          <FlatList
            data={filterdata}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
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
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#373737',
  },
  radioButton: {
    margin: 20,
    marginTop: 20,
  },
  srchbar: {
    width: widthScreen * 0.6,
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: 'bold',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
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
});

export default {component: AnnexDashboard, name: 'AnnexDashboard'};

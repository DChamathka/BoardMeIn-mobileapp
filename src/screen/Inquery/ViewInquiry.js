import React, {Component} from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default class InquiryFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch(`http://192.168.43.200:5000/user/inquiry/${id}`)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          () => {
            // In this block you can do something with new state.
            this.arrayholder = responseJson;
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  GetFlatListItem(name) {
    Alert.alert(name);
  }

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.userid.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('ReturnDetails')}
          style={{
            height: 40,
            width: 160,
            borderRadius: 20,
            backgroundColor: '#151B54',
            marginLeft: 250,
            marginRight: 50,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 10,
            }}>
            Add Inquiry
          </Text>
        </TouchableHighlight>
        <Text
          style={{
            color: '#FF0000',
            marginLeft: 20,
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
          }}>
          Inquiry List
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.searchData(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{backgroundColor: '#ADD8E6', padding: 10, margin: 10}}>
              <Text style={{color: '#151B54', fontWeight: 'bold'}}>
                Inquiry Type :{item.inquirytype}
              </Text>
              <Text style={{color: '#151B54', fontWeight: 'bold'}}>
                Reason : {item.reason}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },

  row: {
    fontSize: 18,
    padding: 12,
  },

  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
});

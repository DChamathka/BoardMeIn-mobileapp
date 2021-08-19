import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = (props) => {
  const toggleDrawer = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.leftButton}
          >
            <Icon name="menu" size={35} color='#fff'/>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Board-Me-In</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#323032',
    padding: 5,
    minHeight: 60,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 40,
  },
  buttonTxt: {
    color: '#ddd',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#ddd',
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Italic-VariableFont_wght',
  },
});

export default CustomHeader;

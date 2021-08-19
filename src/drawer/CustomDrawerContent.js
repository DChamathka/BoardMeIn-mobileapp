import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../../assest/images/logo.jpg');

const CustomDrawerContent = props => {
  const onItemPress = key => {
    const filteredMainDrawerRoutes = props.drawerItems.find(e => {
      return e.key === key;
    });
    const selectedRoute = filteredMainDrawerRoutes.route;
    props.navigation.toggleDrawer();
    props.navigation.navigate(selectedRoute.nav, {
      screen: selectedRoute.routeName,
    });
  };

  const logOut = async () => {
    console.log('log out');
    AsyncStorage.clear();
    props.navigation.replace('Auth');
  };

  function renderMainDrawer() {
    return (
      <View>
        {props.drawerItems.map(parent => (
          <View key={parent.key}>
            <TouchableOpacity
              key={parent.key}
              onPress={() => {
                onItemPress(parent.key);
              }}>
              <View style={styles.parentItem}>
                
                <Text style={[styles.icon, styles.title]}> <Icon name={parent.icon} size={25} color="#fff" />{' '}{parent.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {renderLogoutBtn()}
      </View>
    );
  }

  function renderLogoutBtn() {
    return (
      <View>
        <TouchableOpacity onPress={logOut} >
          <View style={styles.parentItem}>
            <Text style={styles.title}><Icon name="power-standby" size={25} colour='#fff'/>{' '}{'Log out'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.drawerContainer}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.centered}>
          <Image
            source={logo}
            style={styles.logo}
          />
        </View>
        {renderMainDrawer()}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  drawerContainer: {
    backgroundColor: '#323032',
  },
  container: {
    flex: 1,
    zIndex: 1000,
  },
  centered: {
    alignItems: 'center',
  },
  parentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    margin: 16,
    fontWeight: 'bold',
    color: '#F0F0F0',
    textAlign: 'center',
  },
});

export default CustomDrawerContent;

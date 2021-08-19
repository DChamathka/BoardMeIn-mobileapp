import 'react-native-gesture-handler';
import React from 'react';

import {StatusBar, View, Image, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import LoadingScreen from './screen/LoadingScreen';
import SplashScreen from './screen/SplashScreen';
import LandingScreen from './screen/LandingScreen';
import LogScreen from './screen/LogScreen';

import OwnerSignIn from './screen/Owner/OwnerSignIn';
import OwnerSignUp from './screen/Owner/OwnerSignUp';
import OwnerProfile from './screen/Owner/OwnerProfile';
import OwnerPropView from './screen/Owner/OwnerPropView';
import OEditProfile from './screen/Owner/OEditProfile';
import AddPlace from './screen/Owner/AddPlace';
import EditPlace from './screen/Owner/EditPlace';

import {
  GuestSignIn,
  GuestSignUp,
  GEditProfile,
  GuestProfile,
} from './screen/Guest/GIndex';

import DisplayCategory from './screen/PropertyDisplay/DisplayCategory';
import SingleRoomDashboard from './screen/PropertyDisplay/SingleRoomDashboard';
import SharedRoomDashboard from './screen/PropertyDisplay/SharedRoomDashboard';
import AnnexDashboard from './screen/PropertyDisplay/AnnexDashboard';
import HouseDashboard from './screen/PropertyDisplay/HouseDashboard';
import Moredetail from './screen/PropertyDisplay/Moredetail';

import GoogleMap from './screen/GoogleMap/GoogleMap';

import Book from './screen/Booking/Book';

import Chat from './screen/Chat/ChatUI';

import AddComment from './screen/Feedback/AddComment';
import Feedback from './screen/Feedback/Feedback';

import Inquiry from './screen/Inquery/InqueryForm';

import {drawerItemsMain} from './drawer/DrawerItemsMain';
import CustomDrawerContent from './drawer/CustomDrawerContent.js';
import CustomHeader from './drawer/CustomHeader';

const Stack = createStackNavigator();
const HStack = createStackNavigator();
const GPStack = createStackNavigator();
const OStack = createStackNavigator();
const PropStack = createStackNavigator();
const CStack = createStackNavigator();
const IStack = createStackNavigator();
const Drawer = createDrawerNavigator();

//===============
const Auth = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={LandingScreen.name}
        component={LandingScreen.component}
      />
      <Stack.Screen name={LogScreen.name} component={LogScreen.component} />
      <Stack.Screen name={OwnerSignUp.name} component={OwnerSignUp.component} />
      <Stack.Screen name={OwnerSignIn.name} component={OwnerSignIn.component} />
      <Stack.Screen name={GuestSignIn.name} component={GuestSignIn.component} />
      <Stack.Screen name={GuestSignUp.name} component={GuestSignUp.component} />
      <Stack.Screen name="property" component={Property} />
    </Stack.Navigator>
  );
};

const GProfile = ({navigation}) => {
  return (
    <GPStack.Navigator
      initialRouteName="GuestProfile"
      screenOptions={{headerShown: false}}>
      <GPStack.Screen
        name={GEditProfile.name}
        component={GEditProfile.component}
      />
      <GPStack.Screen name="GuestProfile" component={GuestProfile} />
      <GPStack.Screen
        name="AInquiry"
        component={AInquiry}
        options={{title: 'Inquiry'}}
      />
    </GPStack.Navigator>
  );
};

const Property = ({navigation}) => {
  return (
    <PropStack.Navigator
      initialRouteName="Auth"
      screenOptions={{headerShown: false}}>
      <PropStack.Screen
        name={DisplayCategory.name}
        component={DisplayCategory.component}
      />
      <PropStack.Screen
        name={Moredetail.name}
        component={Moredetail.component}
      />
      <PropStack.Screen
        name={SingleRoomDashboard.name}
        component={SingleRoomDashboard.component}
      />
      <PropStack.Screen
        name={SharedRoomDashboard.name}
        component={SharedRoomDashboard.component}
      />
      <PropStack.Screen
        name={AnnexDashboard.name}
        component={AnnexDashboard.component}
      />
      <PropStack.Screen
        name={HouseDashboard.name}
        component={HouseDashboard.component}
      />
      <PropStack.Screen name={GoogleMap.name} component={GoogleMap.component} />
      <PropStack.Screen name={Book.name} component={Book.component} />
      <PropStack.Screen
        name={AddComment.name}
        component={AddComment.component}
      />
    </PropStack.Navigator>
  );
};

const ChatA = () => {
  return (
    <CStack.Navigator>
      <CStack.Screen name={Chat.name} component={Chat.component} />
    </CStack.Navigator>
  );
};

const AInquiry = () => {
  return (
    <IStack.Navigator
      initialRouteName="Inquiry"
      screenOptions={{headerShown: false}}>
      <IStack.Screen name={Inquiry.name} component={Inquiry.component} />
    </IStack.Navigator>
  );
};

const Guest = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Property"
      drawerContent={props => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Drawer.Screen name="Property" component={Property} />
      <Drawer.Screen name="GProfile" component={GProfile} />
    </Drawer.Navigator>
  );
};

const Owner = ({navigation}) => {
  const logOut = async () => {
    console.log('log out');
    AsyncStorage.clear();
    navigation.replace('Auth');
  };
  return (
    <OStack.Navigator
      initialRouteName="OwnerProfile"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <Icon name="power" size={25} color="#fff" onPress={() => logOut()} />
        ),
      }}>
      <OStack.Screen
        name={OwnerProfile.name}
        component={OwnerProfile.component}
        options={{title: 'Owner Profile'}}
      />
      <OStack.Screen
        name={OEditProfile.name}
        component={OEditProfile.component}
        options={{title: 'Update Profile '}}
      />
      <OStack.Screen
        name={OwnerPropView.name}
        component={OwnerPropView.component}
        options={{title: 'View properties'}}
      />
      <OStack.Screen
        name={AddPlace.name}
        component={AddPlace.component}
        options={{title: 'Add new property'}}
      />
      <OStack.Screen
        name={EditPlace.name}
        component={EditPlace.component}
        options={{title: 'Update property details'}}
      />
      <OStack.Screen
        name="AInquiry"
        component={AInquiry}
        options={{title: 'Inquiry'}}
      />
      <OStack.Screen
        name={Feedback.name}
        component={Feedback.component}
        options={{title: 'Comment & Reviews'}}
      />
    </OStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerTintColor: '#307ecc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          header: props => {
            return <CustomHeader {...props} />;
          },
        }}>
        <Stack.Screen
          name={SplashScreen.name}
          component={SplashScreen.component}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GProfile"
          component={GProfile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Guest"
          component={Guest}
          options={{
            headerTintColor: '#323032',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            header: props => {
              return <CustomHeader {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="Property"
          component={Property}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Owner"
          component={Owner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatA"
          component={ChatA}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AInquiry"
          component={AInquiry}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FontAwesome5, Fontisto, Feather} from '@expo/vector-icons';

import {HomeScreen, DealsScreen, RegisterLoginScreen} from './screens';
import SideBar from './components/SideBar';
import { Dimensions } from 'react-native';
import { gStyles } from './global.style';

const details = {
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
    }
  },
  RegisterLoginScreen: {
    screen: RegisterLoginScreen,
    navigationOptions: {
      title: "Register/Login",
      drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
    }
  },
  DealsScreen: {
    screen: DealsScreen,
    navigationOptions: {
      title: "Deals",
      drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
    }
  },
}

// const StackNavigator = createStackNavigator(details);

const DrawerNavigator = createDrawerNavigator(
  details,
  {
  contentComponent: props => <SideBar {...props} />,
  hideStatusBar: true,
  drawerWidth: Dimensions.get('window').width * 0.65,
  contentOptions: {
    activeBackgroundColor: gStyles.tint,
    activeTintColor: 'black',
    itemsContainerStyle: {
      marginTop: 16,
    },
    itemStyle: {
      borderRadius: 4
    }
  }
});

export default createAppContainer(DrawerNavigator);
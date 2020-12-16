import React, { useEffect, useState } from 'react';
import {FontAwesome5, Fontisto, Feather} from '@expo/vector-icons';
import AnimatedSplash from "react-native-animated-splash-screen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/Home';
import Cart from './screens/Cart';
import SideBar from './components/SideBar';
import { gStyles } from './global.style';

import { Provider } from 'react-redux';
import configureStore from './src/store';
import ClientLogin from './screens/Authentication/ClientLogin';

const store = configureStore();


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ClientLoginStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} />
  </HomeStack.Navigator>
)

const ClientLoginStackScreen = () => (
  <ClientLoginStack.Navigator>
    <ClientLoginStack.Screen name="ClientLogin" component={ClientLogin} options={{headerShown: false}} />
  </ClientLoginStack.Navigator>
)

const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen name="Cart" component={Cart} />
  </CartStack.Navigator>
)


export default () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(true), 0);
  }, []);
  
  return (
  <Provider store={store}>
      <AnimatedSplash
          translucent={true}
          isLoaded={loading}
          logoImage={require("./assets/logoM.png")}
          backgroundColor={gStyles.primary}
          logoHeight={150}
          logoWidth={150}
      >
      <NavigationContainer>
        <Drawers.Navigator initialRouteName="Register/Login" drawerContent={SideBar}>
          <Drawers.Screen headerShown="false" options={{
            title: 'Home',
            drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
          }} name="Home" component={HomeStackScreen} />
          <Drawers.Screen headerShown="false" options={{
            title: 'Register/Login',
            drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
          }} name="Register/Login" component={ClientLoginStackScreen} />
          <Drawers.Screen headerShown="false" options={{
            title: 'Deals',
            drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
          }} name="Deals" component={HomeStackScreen} />
        </Drawers.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  </Provider>
)};
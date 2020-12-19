import React, { useEffect, useState } from 'react';
import {FontAwesome5, Fontisto, Feather} from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Cart from '../screens/Cart';
import SideBar from '../components/SideBar';
import { gStyles } from '../global.style';
import ClientLogin from '../screens/Authentication/ClientLogin';
import ClientLoginSuccess from '../screens/Authentication/ClientLoginSuccess';

import { connect } from 'react-redux';
import { login } from './actions/auth';


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
    <ClientLoginStack.Screen name="ClientLoginSuccess" component={ClientLoginSuccess} options={{headerShown: false}} />
  </ClientLoginStack.Navigator>
)

const Navigation = (props) => {
  return (
    <NavigationContainer>
    <Drawers.Navigator drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Register/Login" drawerContent={SideBar}>
        <Drawers.Screen headerShown="false" options={{
        title: 'Home',
        drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
        }} name="Home" component={HomeStackScreen} />
        {!props.loggedIn ? 
        <Drawers.Screen headerShown="false" options={{
        title: 'Register/Login',
        drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
        }} name="Register/Login" component={ClientLoginStackScreen} />
        :
        <Drawers.Screen headerShown="false" options={{
        title: 'Deals',
        drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
        }} name="Deals" component={HomeStackScreen} />}
    </Drawers.Navigator>
    </NavigationContainer>
)};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (account) => dispatch(login(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
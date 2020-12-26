import React, { useEffect, useState } from 'react';
import {FontAwesome5, Fontisto, Feather} from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Cart from '../screens/Cart';
import SideBar from '../components/SideBar';
import { gStyles } from '../global.style';
import ClientLogin from '../screens/Authentication/Client/ClientLogin';
import ClientLoginSuccess from '../screens/Authentication/Client/ClientLoginSuccess';

import { connect } from 'react-redux';
import { login } from './actions/auth';
import ClientRegister from '../screens/Authentication/Client/ClientRegister';
import SellerLogin from '../screens/Authentication/Seller/SellerLogin';
import SellerLoginSuccess from '../screens/Authentication/Seller/SellerLoginSuccess';
import SellerRegister from '../screens/Authentication/Seller/SellerRegister';
import SellerStoreRegister from '../screens/Authentication/Seller/SellerStoreRegister';
import useLanguage from '../hooks/language';


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} />
  </HomeStack.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="ClientLogin" component={ClientLogin} options={{headerShown: false}} />
    <AuthStack.Screen 
        name="ClientRegister"
        component={ClientRegister} 
        options={{title: '', headerStyle: {backgroundColor: gStyles.background, elevation: 0, shadowOpacity: 0}}} 
    />
    <AuthStack.Screen name="ClientLoginSuccess" component={ClientLoginSuccess} options={{headerShown: false}} />
    <AuthStack.Screen name="SellerLogin" component={SellerLogin} options={{title: '', headerBackTitleVisible: false, headerStyle: {backgroundColor: gStyles.background, elevation: 0, shadowOpacity: 0}}} />
    <AuthStack.Screen name="SellerRegister" 
        component={SellerRegister}
        options={{title: '', headerBackTitleVisible: false, headerStyle: {backgroundColor: gStyles.background, elevation: 0, shadowOpacity: 0}}}
    />
    <AuthStack.Screen name="SellerStoreRegister" 
        component={SellerStoreRegister}
        options={{title: '', headerBackTitleVisible: false, headerStyle: {backgroundColor: gStyles.background, elevation: 0, shadowOpacity: 0}}}
    />
    <AuthStack.Screen name="SellerLoginSuccess" component={SellerLoginSuccess} options={{headerShown: false}} />
  </AuthStack.Navigator>
)

const Navigation = (props) => {
  const [language, languageState] = useLanguage('navigation');
  return (
    <NavigationContainer>
    <Drawers.Navigator drawerPosition={languageState ? 'right' : 'left'} drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Home" drawerContent={props => <SideBar {...props} />}>
        <Drawers.Screen 
            headerShown="false"
            options={{
              title: 'Home',
              drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
            }}
            name="Home"
            component={HomeStackScreen}
        />
        {!props.loggedIn ? 
          <Drawers.Screen
              headerShown="false"
              options={{
                title: 'Register/Login',
                drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
              }} 
              name="Register/Login" component={AuthStackScreen}
          />
        :
          [<Drawers.Screen
              key="deals"
              headerShown="false"
              options={{
                title: 'Deals',
                drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
              }}
              name="Deals"
              component={HomeStackScreen}
          />]
        }
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
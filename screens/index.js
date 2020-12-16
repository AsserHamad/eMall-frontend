import React from 'react';
import ClientLogin from './Authentication/ClientLogin';
import Home from './Home';

export const HomeScreen = ({navigation}) => <Home navigation={navigation} name="Home" />
export const RegisterLoginScreen = ({navigation}) => <ClientLogin navigation={navigation} name="ClientLogin" />
export const DealsScreen = ({navigation}) => <Home navigation={navigation} name="Home" />
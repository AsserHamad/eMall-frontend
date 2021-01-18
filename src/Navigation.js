import React from 'react';
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

import { connect, useSelector } from 'react-redux';
import { login } from './actions/auth';
import ClientRegister from '../screens/Authentication/Client/ClientRegister';
import SellerLogin from '../screens/Authentication/Seller/SellerLogin';
import SellerLoginSuccess from '../screens/Authentication/Seller/SellerLoginSuccess';
import SellerRegister from '../screens/Authentication/Seller/SellerRegister';
import SellerStoreRegister from '../screens/Authentication/Seller/SellerStoreRegister';
import { useLanguageText, useLanguage } from '../hooks/language';
import CategoryPage from '../screens/CategoryPage';
import Wishlist from '../screens/Wishlist';
import SubcategoryPage from '../screens/SubcategoryPage';
import Product from '../screens/Product';
import Payment from '../screens/Payment';
import Store from '../screens/Store/Store';
import Icon from '../components/utils/Icon';
import Profile from '../screens/Client/Profile';
import StoreHome from '../screens/Store/StoreHome';


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();
const StoreStack = createStackNavigator();
const AuthStack = createStackNavigator();
const WishlistStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} />
    <HomeStack.Screen name="Category" component={CategoryPage} options={({ route }) => ({title: route.params.name.en, headerShown: false})} />
    <HomeStack.Screen name="Subcategory" component={SubcategoryPage} options={({ route }) => ({ headerShown: false})} />
    <HomeStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Payment" component={Payment} />
    <HomeStack.Screen name="Store" component={Store} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Profile" component={Profile} options={({ route }) => ({ headerShown: false })} />
  </HomeStack.Navigator>
)

const StoreStackScreen = () => (
  <StoreStack.Navigator>
    <StoreStack.Screen name="Home" component={StoreHome} options={{headerShown: false}} />
  </StoreStack.Navigator>
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

const WishlistStackScreen = () => (
  <WishlistStack.Navigator>
    <WishlistStack.Screen name="Wishlist" component={Wishlist} options={{headerShown: false}} />
    <WishlistStack.Screen name="Cart" component={Cart} />
  </WishlistStack.Navigator>
)

const ClientDrawer = () => {
  const languageText = useLanguageText('navigation');
  const language = useLanguage();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  return(
    <Drawers.Navigator drawerPosition={language === 'ar' ? 'right' : 'left'} drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Home" drawerContent={props => <SideBar {...props} />}>
        <Drawers.Screen 
            headerShown="false"
            options={{
              title: 'Home',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
            }}
            name="Home"
            component={HomeStackScreen}
        />
        <Drawers.Screen 
            options={{
              title: 'Wishlist',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="heart" size={16} color={tintColor} />
            }}
            name="Wishlist"
            component={WishlistStackScreen}
        />
        
        {!loggedIn ? 
          <Drawers.Screen
              headerShown="false"
              options={{
                title: 'Register/Login',
                drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="home" size={16} color={tintColor} />
              }} 
              name="Register/Login" component={AuthStackScreen}
          />
        :
          [<Drawers.Screen
              key="deals"
              headerShown="false"
              options={{
                title: 'Deals',
                drawerIcon: ({tintColor}) => <Icon type="Fontisto" name="shopping-sale" size={16} color={tintColor} />
              }}
              name="Deals"
              component={HomeStackScreen}
          />]
        }
    </Drawers.Navigator>
  )
}

const StoreDrawer = () => {
  const languageText = useLanguageText('navigation');
  const language = useLanguage();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  return (
  <Drawers.Navigator drawerPosition={language === 'ar' ? 'right' : 'left'} drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Home">
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Home',
            drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
          }}
          name="Home"
          component={StoreStackScreen}
      />
  </Drawers.Navigator>
  )
}

const Navigation = () => {
  const type = useSelector(state => state.authReducer.type);
  return (
    <NavigationContainer>
      {(!type || type === 'client') ? <ClientDrawer /> : <StoreDrawer />}
    </NavigationContainer>
)};

export default Navigation;
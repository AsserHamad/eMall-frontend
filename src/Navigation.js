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
import ProductsListPage from '../screens/ProductsListPage';
import Payment from '../screens/Payment';
import Store from '../screens/Store/Store';
import Icon from '../components/utils/Icon';
import Profile from '../screens/Client/Profile';
import StoreHome from '../screens/Store/StoreHome';
import StoreSidebar from '../components/StoreSidebar';
import StoreProducts from '../screens/Store/StoreProducts';
import StoreProductsAdd from '../screens/Store/StoreProductAdd';
import StorePageDashboard from '../screens/Store/StorePageDashboard.';
import StoreOrders from '../screens/Store/StoreOrders';
import MyAddresses from '../screens/Client/MyAddresses';
import ConfirmPurchase from '../screens/Client/ConfirmPurchase';
import MyOrders from '../screens/Client/MyOrders';
import StoreAds from '../screens/Store/StoreAds';
import HomeAds from '../screens/Store/Ads/HomeAds';
import BannerAds from '../screens/Store/Ads/BannerAds';
import StoreMembers from '../screens/Store/StoreMembers';
import AddMembers from '../components/Store/AddMembers';
import DealsOfTheDayAd from '../screens/Store/Ads/DealsOfTheDayAd';
import RequestWithdrawal from '../components/Store/Dashboard/RequestWithdrawal';


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const OrdersStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} />
    <HomeStack.Screen name="Category" component={CategoryPage} options={({ route }) => ({title: route.params.name.en, headerShown: false})} />
    <HomeStack.Screen name="Subcategory" component={SubcategoryPage} options={({ route }) => ({ headerShown: false})} />
    <HomeStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="ProductsList" component={ProductsListPage} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="Payment" component={Payment}/>
    <HomeStack.Screen name="Order" component={ConfirmPurchase} options={({ route }) => ({title: 'Order Complete'})} />
    <HomeStack.Screen name="Store" component={Store} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Profile" component={Profile} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Addresses" component={MyAddresses} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Orders" component={MyOrders} options={({ route }) => ({ headerShown: false })} />
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

const WishlistStackScreen = () => (
  <WishlistStack.Navigator>
    <WishlistStack.Screen name="Wishlist" component={Wishlist} options={{headerShown: false}} />
    <WishlistStack.Screen name="Cart" component={Cart} />
  </WishlistStack.Navigator>
)

const OrdersStackScreen = () => (
  <OrdersStack.Navigator>
    <OrdersStack.Screen name="Orders" component={MyOrders} options={{headerShown: false}} />
  </OrdersStack.Navigator>
)

const ClientDrawer = () => {
  const languageText = useLanguageText('navigation');
  const language = useLanguage();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  return(
    <Drawers.Navigator drawerPosition={language === 'ar' ? 'right' : 'left'} statusBarAnimation drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Home" drawerContent={props => <SideBar {...props} />}>
        <Drawers.Screen 
            headerShown="false"
            options={{
              title: language === 'en' ? 'Home' : 'الرئيسية',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
            }}
            name="Home"
            component={HomeStackScreen}
        />
        <Drawers.Screen 
            options={{
              title: language === 'en' ? 'Wishlist' : 'قائمة الرغبات',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="heart" size={16} color={tintColor} />,
            }}
            name="Wishlist"
            component={WishlistStackScreen}
        />
        
        {!loggedIn ? 
          <Drawers.Screen
              headerShown="false"
              options={{
                title: language === 'en' ? 'Register/Login' : 'تسجيل الدخول',
                drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="home" size={16} color={tintColor} />
              }} 
              name="Register/Login" component={AuthStackScreen}
          />
        :
          [<Drawers.Screen
            key="orders"
            headerShown="false"
            options={{
              title: 'My Orders',
              drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="truck" size={16} color={tintColor} />
            }}
            name="Orders"
            component={OrdersStackScreen}
        />,
        <Drawers.Screen
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

const StoreStack = createStackNavigator();
const ProductsStack = createStackNavigator();
const StorePageStack = createStackNavigator();
const StoreOrdersStack = createStackNavigator();
const StoreAdsStack = createStackNavigator();
const StoreMembersStack = createStackNavigator();

const StoreStackScreen = () => (
  <StoreStack.Navigator>
    <StoreStack.Screen name="Home" component={StoreHome} options={{headerShown: false}} />
    <StoreStack.Screen name="RequestWithdrawal" component={RequestWithdrawal} options={{title: 'Request Withdrawal'}} />
  </StoreStack.Navigator>
)

const ProductsStackScreen = () => (
  <ProductsStack.Navigator>
    <ProductsStack.Screen name="Products" component={StoreProducts} options={{headerShown: false}} />
    <ProductsStack.Screen name="Add Product" component={StoreProductsAdd} options={{headerShown: false}} />
  </ProductsStack.Navigator>
)

const StorePageStackScreen = () => (
  <StorePageStack.Navigator>
    <StorePageStack.Screen name="Page" component={StorePageDashboard} options={{headerShown: false}} />
  </StorePageStack.Navigator>
)

const StoreOrdersStackScreen = () => (
  <StoreOrdersStack.Navigator>
    <StoreOrdersStack.Screen name="Orders" component={StoreOrders} options={{headerShown: false}} />
  </StoreOrdersStack.Navigator>
)

const StoreAdsStackScreen = () => (
  <StoreAdsStack.Navigator>
    <StoreAdsStack.Screen name="Ads" component={StoreAds} options={{headerShown: false}} />
    <StoreAdsStack.Screen name="HomeAds" component={HomeAds} options={{title: 'Home Ads'}} />
    <StoreAdsStack.Screen name="BannerAds" component={BannerAds} options={{title: 'Banner Ads'}} />
    <StoreAdsStack.Screen name="DealsOfTheDay" component={DealsOfTheDayAd} options={{title: 'Deal Of The Day'}} />
  </StoreAdsStack.Navigator>
)

const StoreMembersStackScreen = () => (
  <StoreMembersStack.Navigator>
    <StoreMembersStack.Screen name="Members" component={StoreMembers} options={{headerShown: false}} />
    <StoreMembersStack.Screen name="AddMember" component={AddMembers} options={{title: 'Add a Member'}} />
  </StoreMembersStack.Navigator>
)

const StoreDrawer = () => {
  const languageText = useLanguageText('navigation');
  const language = useLanguage();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  return (
  <Drawers.Navigator
    edgeWidth={0}
    drawerPosition={language === 'ar' ? 'right' : 'left'}
    drawerStyle={{backgroundColor: gStyles.background}}
    initialRouteName="Orders"
    drawerContent={props => <StoreSidebar {...props} />}>
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Dashboard',
            drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
          }}
          name="Home"
          component={StoreStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Products',
            drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="box" size={16} color={tintColor} />
          }}
          name="Products"
          component={ProductsStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Orders',
            drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="truck" size={16} color={tintColor} />
          }}
          name="Orders"
          component={StoreOrdersStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Page Layout',
            drawerIcon: ({tintColor}) => <Icon type="AntDesign" name="layout" size={16} color={tintColor} />
          }}
          name="Page"
          component={StorePageStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Advertisements',
            drawerIcon: ({tintColor}) => <Icon type="Entypo" name="megaphone" size={16} color={tintColor} />
          }}
          name="Ads"
          component={StoreAdsStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: 'Members',
            drawerIcon: ({tintColor}) => <Icon type="AntDesign" name="adduser" size={16} color={tintColor} />
          }}
          name="Members"
          component={StoreMembersStackScreen}
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
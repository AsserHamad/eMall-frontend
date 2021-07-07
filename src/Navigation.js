import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Cart from '../screens/Cart';
import SideBar from '../components/SideBar';
import { gStyles } from '../global.style';
import ClientLogin from '../screens/Authentication/Client/ClientLogin';
import ClientLoginSuccess from '../screens/Authentication/Client/ClientLoginSuccess';

import { useSelector } from 'react-redux';
import ClientRegister from '../screens/Authentication/Client/ClientRegister';
import SellerLogin from '../screens/Authentication/Seller/SellerLogin';
import SellerLoginSuccess from '../screens/Authentication/Seller/SellerLoginSuccess';
import SellerRegister from '../screens/Authentication/Seller/SellerRegister';
import SellerStoreRegister from '../screens/Authentication/Seller/SellerStoreRegister';
import { useLanguage } from '../hooks/language';
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
import { Constants } from 'react-native-unimodules';
import MyProfile from '../screens/Client/MyProfile';
import ContactUs from '../screens/Footer/ContactUs';
import Terms from '../screens/Footer/Terms';
import FAQs from '../screens/Footer/FAQs';
import MyPayments from '../screens/Client/MyPayments';
import StorePayments from '../screens/Store/StorePayments';
import ForgotPassword from '../screens/Authentication/Client/ForgotPassword';
import StoreProductOptions from '../screens/Store/StoreProductOptions';
import CategoriesList from '../screens/CategoriesList';
import UpdateProductPick from '../screens/Store/Products/UpdateProductPick';
import UpdateProduct from '../screens/Store/Products/UpdateProduct';
import DeleteProduct from '../screens/Store/Products/DeleteProduct';
import Gallery from '../screens/Gallery';
import Deals from '../screens/Deals';
import DealsOfTheDayScreen from '../screens/DealsOfTheDayScreen';
import Welcome from '../screens/Welcome';
import ViewAllProducts from '../screens/ViewAllProducts';
import ViewAllStores from '../screens/ViewAllStores';
import { Image } from 'react-native';
import SearchPage from '../screens/Search/SearchPage';
import ChangePhoneNumber from '../screens/Client/ChangePhoneNumber';
import ChangePassword from '../screens/Client/ChangePassword';


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const CategoriesStack = createStackNavigator();
const DealsStack = createStackNavigator();
const DealsOfTheDayStack = createStackNavigator();
const FirstTimeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="ContactUs" component={ContactUs} options={{headerShown: false}} />
    <HomeStack.Screen name="Terms" component={Terms} options={{headerShown: false}} />
    <HomeStack.Screen name="FAQs" component={FAQs} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} options={() => ({headerShown: false})} />
    <HomeStack.Screen name="Categories" component={CategoriesList} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="Category" component={CategoryPage} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="Subcategory" component={SubcategoryPage} options={({ route }) => ({ headerShown: false})} />
    <HomeStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Gallery" component={Gallery} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="ProductsList" component={ProductsListPage} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="SearchPage" component={SearchPage} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="ViewAllProducts" component={ViewAllProducts} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="ViewAllStores" component={ViewAllStores} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="Payment" component={Payment} options={({ route }) => ({headerShown: false})}/>
    <HomeStack.Screen name="Order" component={ConfirmPurchase} options={({ route }) => ({headerShown: false})} />
    <HomeStack.Screen name="Store" component={Store} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Profile" component={Profile} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Addresses" component={MyAddresses} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Orders" component={MyOrders} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="MyProfile" component={MyProfile} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="ChangePhone" component={ChangePhoneNumber} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="ChangePassword" component={ChangePassword} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="MyPayments" component={MyPayments} options={({ route }) => ({ headerShown: false })} />
  </HomeStack.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="ClientLogin" component={ClientLogin} options={{headerShown: false}} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
    <AuthStack.Screen 
        name="ClientRegister"
        component={ClientRegister} 
        options={{title: '', headerShown: false}} 
    />
    <AuthStack.Screen name="ClientLoginSuccess" component={ClientLoginSuccess} options={{headerShown: false}} />
    <AuthStack.Screen name="SellerLogin" component={SellerLogin} options={({ route }) => ({ headerShown: false })} />
    <AuthStack.Screen name="SellerRegister" 
        component={SellerRegister}
        options={{title: '', elevation: 0, shadowOpacity: 0, headerShown: false}}
    />
    <AuthStack.Screen name="SellerStoreRegister" 
        component={SellerStoreRegister}
        options={{title: '', headerBackTitleVisible: false, headerShown: false}}
    />
    <AuthStack.Screen name="SellerLoginSuccess" component={SellerLoginSuccess} options={{headerShown: false}} />
  </AuthStack.Navigator>
)

const WishlistStackScreen = () => (
  <WishlistStack.Navigator>
    <WishlistStack.Screen name="Wishlist" component={Wishlist} options={{headerShown: false}} />
    <WishlistStack.Screen name="Cart" component={Cart} />
    <HomeStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Gallery" component={Gallery} options={({ route }) => ({ headerShown: false })} />
  </WishlistStack.Navigator>
)

const OrdersStackScreen = () => (
  <OrdersStack.Navigator>
    <OrdersStack.Screen name="Orders" component={MyOrders} options={{headerShown: false}} />
  </OrdersStack.Navigator>
)

const CategoriesStackScreen = (props) => (
  <CategoriesStack.Navigator>
    <CategoriesStack.Screen name="Category" component={CategoryPage} initialParams={props.route.params} options={({ route }) => ({headerShown: false})} />
    <CategoriesStack.Screen name="Subcategory" component={SubcategoryPage} options={({ route }) => ({ headerShown: false})} />
    <CategoriesStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <HomeStack.Screen name="Gallery" component={Gallery} options={({ route }) => ({ headerShown: false })} />
  </CategoriesStack.Navigator>
)

const DealsStackScreen = () => (
  <DealsStack.Navigator>
    <DealsStack.Screen name="Deals" component={Deals} options={({ route }) => ({headerShown: false})} />
    <DealsStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <DealsStack.Screen name="Gallery" component={Gallery} options={({ route }) => ({ headerShown: false })} />
  </DealsStack.Navigator>
)

const DealsOfTheDayStackScreen = () => (
  <DealsOfTheDayStack.Navigator>
    <DealsOfTheDayStack.Screen name="DealsOfTheDay" component={DealsOfTheDayScreen} options={({ route }) => ({headerShown: false})} />
    <DealsOfTheDayStack.Screen name="Product" component={Product} options={({ route }) => ({ headerShown: false })} />
    <DealsOfTheDayStack.Screen name="Gallery" component={Gallery} options={({ route }) => ({ headerShown: false })} />
  </DealsOfTheDayStack.Navigator>
)

const FirstTimeStackScreen = () => (
  <FirstTimeStack.Navigator>
    <FirstTimeStack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="ClientLogin" component={ClientLogin} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="ClientRegister" component={ClientRegister} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="ClientLoginSuccess" component={ClientLoginSuccess} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="SellerLogin" component={SellerLogin} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="SellerRegister" component={SellerRegister} options={{headerShown: false}} />
    <FirstTimeStack.Screen name="SellerStoreRegister" component={SellerStoreRegister} options={{headerShown: false}}/>
    <FirstTimeStack.Screen name="SellerLoginSuccess" component={SellerLoginSuccess} options={{headerShown: false}} />
  </FirstTimeStack.Navigator>
)

const ClientDrawer = () => {
  const language = useLanguage();
  const en = language === 'en';
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
      fetch(`${Constants.manifest.extra.apiUrl}/category`)
      .then(res => res.json())
      .then(res => setCategories(res))
  }, []);
  return(
    <Drawers.Navigator drawerPosition={language === 'ar' ? 'right' : 'left'} statusBarAnimation drawerStyle={{backgroundColor: gStyles.background}} initialRouteName="Home" drawerContent={props => <SideBar {...props} />}>
        <Drawers.Screen 
            headerShown="false"
            options={{
              title: en ? 'Home' : 'الرئيسية',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
            }}
            name="Home"
            component={HomeStackScreen}
        />
        
        {!loggedIn ? 
          <Drawers.Screen
              headerShown="false"
              options={{
                title: en ? 'Register/Login' : 'تسجيل الدخول',
                drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="home" size={16} color={tintColor} />
              }} 
              name="Register/Login" component={AuthStackScreen}
          />
        :
          [<Drawers.Screen
            key={'myOrders'}
            headerShown="false"
            options={{
              title: en ? 'My Orders' : 'طلباتي',
              drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="truck" size={16} color={tintColor} />
            }}
            name="Orders"
            component={OrdersStackScreen}
        />,
        <Drawers.Screen 
            key={'wishlist'}
            options={{
              title: en ? 'Wishlist' : 'قائمة الرغبات',
              drawerIcon: ({tintColor}) => <Icon type="Feather" name="heart" size={16} color={tintColor} />,
            }}
            name="Wishlist"
            component={WishlistStackScreen}
        />
      ]
    }
      <Drawers.Screen
            key={'dealsoftheday'}
            headerShown="false"
            options={{
              title: en ? 'DealsOfTheDay' : 'عروض اليوم',
              drawerIcon: ({tintColor}) => <Icon type="Entypo" name="megaphone" size={16} color={tintColor} />
            }}
            name="DealsOfTheDay"
            component={DealsOfTheDayStackScreen}
        />
      <Drawers.Screen
          key={'deals'}
            headerShown="false"
            options={{
              title: en ? 'Deals' : 'العروض',
              drawerIcon: ({tintColor}) => <Icon type="Fontisto" name="shopping-sale" size={16} color={tintColor} />
            }}
            name="Deals"
            component={DealsStackScreen}
        />
        {categories.map(category => {
          return (
                <Drawers.Screen
                  key={category._id}
                  headerShown="false"
                  options={{
                    title: category.name[language],
                    drawerIcon: ({tintColor}) => <Image source={{uri: category.image}} style={{width: 16, aspectRatio: 1}} color={tintColor} />
                  }}
                  name={category.name[language]}
                  component={CategoriesStackScreen}
                  initialParams={category}
                />
          )
        })}
    </Drawers.Navigator>
  )
}

const StoreStack = createStackNavigator();
const ProductsStack = createStackNavigator();
const StorePageStack = createStackNavigator();
const StoreOrdersStack = createStackNavigator();
const StoreAdsStack = createStackNavigator();
const StoreMembersStack = createStackNavigator();
const StorePaymentsStack = createStackNavigator();

const StoreStackScreen = () => (
  <StoreStack.Navigator>
    <StoreStack.Screen name="Home" component={StoreHome} options={{headerShown: false}} />
    <StoreStack.Screen name="RequestWithdrawal" component={RequestWithdrawal} options={{headerShown: false}} />
  </StoreStack.Navigator>
)

const ProductsStackScreen = () => (
  <ProductsStack.Navigator>
    <ProductsStack.Screen name="Products" component={StoreProducts} options={{headerShown: false}} />
    <ProductsStack.Screen name="AddProduct" component={StoreProductsAdd} options={{headerShown: false}} />
    <ProductsStack.Screen name="UpdateProductPick" component={UpdateProductPick} options={{headerShown: false}} />
    <ProductsStack.Screen name="UpdateProduct" component={UpdateProduct} options={{headerShown: false}} />
    <ProductsStack.Screen name="DeleteProduct" component={DeleteProduct} options={{headerShown: false}} />
    <ProductsStack.Screen name="ProductOptions" component={StoreProductOptions} options={{headerShown: false}} />
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
    <StoreAdsStack.Screen name="HomeAds" component={HomeAds} options={{headerShown: false}} />
    <StoreAdsStack.Screen name="BannerAds" component={BannerAds} options={{headerShown: false}} />
    <StoreAdsStack.Screen name="DealsOfTheDay" component={DealsOfTheDayAd} options={{headerShown: false}} />
  </StoreAdsStack.Navigator>
)

const StoreMembersStackScreen = () => (
  <StoreMembersStack.Navigator>
    <StoreMembersStack.Screen name="Members" component={StoreMembers} options={{headerShown: false}} />
    <StoreMembersStack.Screen name="AddMember" component={AddMembers} options={{headerShown: false}} />
  </StoreMembersStack.Navigator>
)

const StorePaymentsStackScreen = () => (
  <StorePaymentsStack.Navigator>
    <StorePaymentsStack.Screen name="Payments" component={StorePayments} options={{headerShown: false}} />
    <StorePaymentsStack.Screen name="RequestWithdrawal" component={RequestWithdrawal} options={{headerShown: false}} />
  </StorePaymentsStack.Navigator>
)

const StoreDrawer = () => {
  const language = useLanguage();
  const en = language === 'en';
  return (
  <Drawers.Navigator
    edgeWidth={0}
    drawerPosition={en ? 'left' : 'right'}
    drawerStyle={{backgroundColor: gStyles.background}}
    initialRouteName="Home"
    drawerContent={props => <StoreSidebar {...props} />}>
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Dashboard' : 'الرئيسية',
            drawerIcon: ({tintColor}) => <Icon type="Feather" name="log-in" size={16} color={tintColor} />
          }}
          name="Home"
          component={StoreStackScreen}
      />
      <Drawers.Screen
          headerShown="false"
          options={{
            title: en ? 'Products' : 'المنتجات',
            drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="box" size={16} color={tintColor} />
          }}
          name="Products"
          component={ProductsStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Orders' : 'الطلبات',
            drawerIcon: ({tintColor}) => <Icon type="FontAwesome5" name="truck" size={16} color={tintColor} />
          }}
          name="Orders"
          component={StoreOrdersStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Page Layout' : 'شكل الصفحة',
            drawerIcon: ({tintColor}) => <Icon type="AntDesign" name="layout" size={16} color={tintColor} />
          }}
          name="Page"
          component={StorePageStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Advertisements' : 'الاعلانات',
            drawerIcon: ({tintColor}) => <Icon type="Entypo" name="megaphone" size={16} color={tintColor} />
          }}
          name="Ads"
          component={StoreAdsStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Members' : 'الموظفين',
            drawerIcon: ({tintColor}) => <Icon type="AntDesign" name="adduser" size={16} color={tintColor} />
          }}
          name="Members"
          component={StoreMembersStackScreen}
      />
      <Drawers.Screen 
          headerShown="false"
          options={{
            title: en ? 'Payments' : 'المدفوعات',
            drawerIcon: ({tintColor}) => <Icon type="Feather" name="dollar-sign" size={16} color={tintColor} />
          }}
          name="Payments"
          component={StorePaymentsStackScreen}
      />
  </Drawers.Navigator>
  )
}

const FirstTimeDrawer = () => {
  return (
      <Drawers.Navigator initialRouteName="Welcome" drawerContent={props => <SideBar {...props} />}>
      <Drawers.Screen 
          headerShown="false"
          name="Welcome"
          component={FirstTimeStackScreen}
      />
      </Drawers.Navigator>
    )
}

const Navigation = () => {
  const type = useSelector(state => state.authReducer.type);
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  return (
    <NavigationContainer>
      {(!loggedIn) ? <FirstTimeDrawer /> : (type === 'store') ?  <StoreDrawer /> : <ClientDrawer />}
    </NavigationContainer>
)};

export default Navigation;
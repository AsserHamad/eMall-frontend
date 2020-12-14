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

const store = configureStore();


const Drawers = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <HomeStack.Screen name="Cart" component={Cart} />
  </HomeStack.Navigator>
)

const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen name="Cart" component={Cart} />
  </CartStack.Navigator>
)


export default () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(true), 1000);
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
        <Drawers.Navigator initialRouteName="Home" drawerContent={SideBar}>
          <Drawers.Screen headerShown="false" options={{
            title: 'Home',
            drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
          }} name="Home" component={HomeStackScreen} />
          <Drawers.Screen headerShown="false" options={{
            title: 'Register/Login',
            drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
          }} name="Register/Login" component={HomeStackScreen} />
          <Drawers.Screen headerShown="false" options={{
            title: 'Deals',
            drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
          }} name="Deals" component={HomeStackScreen} />
        </Drawers.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  </Provider>
)};

// const details = {
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: {
//       title: "Home",
//       drawerIcon: ({tintColor}) => <FontAwesome5 name="home" size={16} color={tintColor} />
//     }
//   },
//   RegisterLoginScreen: {
//     screen: RegisterLoginScreen,
//     navigationOptions: {
//       title: "Register/Login",
//       drawerIcon: ({tintColor}) => <Feather name="log-in" size={16} color={tintColor} />
//     }
//   },
//   DealsScreen: {
//     screen: DealsScreen,
//     navigationOptions: {
//       title: "Deals",
//       drawerIcon: ({tintColor}) => <Fontisto name="shopping-sale" size={16} color={tintColor} />
//     }
//   },
// }

// // const StackNavigator = createStackNavigator(details);

// const DrawerNavigator = createDrawerNavigator(
//   details,
//   {
//   contentComponent: props => <SideBar {...props} />,
//   hideStatusBar: true,
//   drawerWidth: Dimensions.get('window').width * 0.65,
//   contentOptions: {
//     activeBackgroundColor: gStyles.tint,
//     activeTintColor: 'black',
//     itemsContainerStyle: {
//       marginTop: 16,
//     },
//     itemStyle: {
//       borderRadius: 4
//     }
//   }
// });

// export default createAppContainer(DrawerNavigator);
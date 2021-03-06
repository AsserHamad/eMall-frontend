import React, { useState, useEffect } from 'react';

import { Provider } from 'react-redux';
import configureStore from './src/store';
import Navigation from './src/Navigation';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage } from './src/actions/general';
import { setCart } from './src/actions/cart';
import { changeVariables } from './src/actions/general';
import { setWishlist } from './src/actions/wishlist';
import { login, loginSeller } from './src/actions/auth';
import * as Updates from 'expo-updates';
import HTTP from './src/utils/axios';
import Updating from './screens/Updating';

const store = configureStore();
var firebaseConfig = {
  apiKey: "AIzaSyDeQJq8fsywGTSF2qfJ_P9NfVkHbJ7SFd0",
  authDomain: "e-mall-4b27a.firebaseapp.com",
  projectId: "e-mall-4b27a",
  storageBucket: "e-mall-4b27a.appspot.com",
  messagingSenderId: "208140192291",
  appId: "1:208140192291:web:f09471a2c021810ee0ff96",
  measurementId: "G-4T2SB0HYEM"
};

export default () => {
  const [fontsLoaded] = useFonts({
      'Lato': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato Thin': require('./assets/fonts/Lato-Thin.ttf'),
      'Lato Italic': require('./assets/fonts/Lato-Italic.ttf'),
      'Cairo': require('./assets/fonts/Cairo-Regular.ttf'),
      'Cairo Bold': require('./assets/fonts/Cairo-Bold.ttf'),
      'Cairo Thin': require('./assets/fonts/Cairo-Light.ttf'),
      'Cairo Italic': require('./assets/fonts/Cairo-Regular.ttf'),
  });
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [variablesLoaded, setVariablesLoaded] = useState(false);
  useEffect(() => {
    const getItems = () => {
      AsyncStorage.getItem('@language')
      .then(value => {
        store.dispatch(changeLanguage(Number(value)));
        setLanguageLoaded(true);
      })
      .catch(err => {
        setLanguageLoaded(true);
      });
  
      // ? Get Access Token
      // ? First we get the stored access token in case the client/store was logged in before

      AsyncStorage.getItem('@accessToken')
      .then(accessToken => {
        if(!accessToken) {setAccountLoaded(true); return;}
        accessToken = JSON.parse(accessToken);
        const url = accessToken.type === 'client' ? 'client' : 'seller';

        // ? We check if the token is still valid
        HTTP.get(`/${url}/login/token`, {headers: {authorization: accessToken.token}})
        .then(data => {
          // * If the token is valid, we set it in our interceptors to use in our future requests, and then set the store states
          data.accessToken = accessToken.token;
          if(accessToken.type === 'client'){
            store.dispatch(setCart(data.client.cart));
            store.dispatch(setWishlist(data.client.wishlist));
            store.dispatch(login(data));
          } else {
            store.dispatch(loginSeller(data));
          }
          setAccountLoaded(true);
        })
        .catch(err => {
          
          //! If not valid, use our Refresh Token to get a new access token
          
          AsyncStorage.getItem('@refreshToken')
          .then(refreshToken => {
            HTTP.get(`/${url}/login/token/refresh`, {headers: {authorization: refreshToken}})
            .then(data => {

              // * If the refresh token was valid, we set the result as the new access token
              data.accessToken = data.token;
              if(accessToken.type === 'client'){
                store.dispatch(setCart(data.client.cart));
                store.dispatch(setWishlist(data.client.wishlist));
                store.dispatch(login(data));
              } else {
                store.dispatch(loginSeller(data));
              }
              setAccountLoaded(true);

            })
            .catch(err => {

              // ! Otherwise we just remove the local storage for those items
            
              AsyncStorage.removeItem(`@accessToken`);
              AsyncStorage.removeItem(`@refreshToken`);
              setAccountLoaded(true);
            })

          })
        });
      })
      .catch(err => {
        setAccountLoaded(true);
      });

      HTTP(`/variables`)
      .then(res => {
        store.dispatch(changeVariables(res));
        setVariablesLoaded(true);
      })
      .catch(err => console.log(err));
    }
    const init = async () => {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
      } else {
        getItems();
      }
    };

    // if(__DEV__) 
    getItems();
    // else init();
  }, []);

  if(!(fontsLoaded && languageLoaded && accountLoaded && variablesLoaded))
    return <AppLoading autoHideSplash />;
  else return (
      <Provider store={store}>
        <Navigation />
      </Provider>
  )
};

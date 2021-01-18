import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './src/store';
import Navigation from './src/Navigation';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { changeLanguage } from './src/actions/general';

const store = configureStore();

export default () => {
  const [fontsLoaded] = useFonts({
      'Lato': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato Thin': require('./assets/fonts/Lato-Thin.ttf'),
      'Lato Italic': require('./assets/fonts/Lato-Italic.ttf'),
      'Cairo': require('./assets/fonts/Cairo-Regular.ttf'),
      'Cairo Bold': require('./assets/fonts/Cairo-Bold.ttf'),
      'Cairo Thin': require('./assets/fonts/Cairo-Light.ttf'),
  });
  const [languageLoaded, setLanguageLoaded] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('@language')
    .then(value => {
      store.dispatch(changeLanguage(Number(value)));
      setLanguageLoaded(true);
    })
    .catch(err => {
      setLanguageLoaded(true);
    })
  }, []);
  if(!(fontsLoaded && languageLoaded))
    return <AppLoading autoHideSplash />;
  else
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
)};

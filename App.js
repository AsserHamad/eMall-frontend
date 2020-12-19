import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './src/store';
import Navigation from './src/Navigation';

const store = configureStore();

export default () => {
  return (
  <Provider store={store}>
    <Navigation />
  </Provider>
)};

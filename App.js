import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './components/Home/Home';
import Constants from 'expo-constants';
import { gStyles } from './global.style';

export default function App() {
  return (
      <View style={styles.container}>
        <Home />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.background,
    paddingTop: Constants.statusBarHeight
  }
});

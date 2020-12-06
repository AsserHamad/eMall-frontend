import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './components/Home/Home';
import Constants from 'expo-constants';
import { gStyles } from './global.style';
import SideMenu from 'react-native-side-menu'
import Menu from './components/Menu/Menu';

export default function App() {
  const [menu, setMenu] = useState(false);
  // TODO:// Remove this
  // LogBox.ignoreAllLogs()
  return (
    <SideMenu 
      disableGestures
      menu={<Menu />}
      onChange={(e) => setMenu(e)}
      menuPosition="right"
      isOpen={menu} >
      <View style={styles.container}>
        <Home setMenu={setMenu} />
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gStyles.background,
    paddingTop: Constants.statusBarHeight
  }
});

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import Navbar from '../components/Navbar/Navbar';

import Constants from 'expo-constants';
import MainHomeView from '../components/Home/MainHomeView/MainHomeView';
import { gStyles } from '../global.style';
import { StatusBar } from 'expo-status-bar';

function Home(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato-Regular.ttf')
    });
    const [cart, setCart] = useState([]);

    return(
        <View style={styles.container}>
            <Navbar navigation={props.navigation} cart={cart} />
            <ScrollView style={{height: Dimensions.get('window').height - 60}}>
                <MainHomeView cart={cart} setCart={setCart} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Lato',
        backgroundColor: gStyles.background,
        paddingTop: Constants.statusBarHeight+ 5,
        flex: 1
    },
});

export default Home;
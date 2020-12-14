import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Text } from 'react-native';
import { useFonts } from 'expo-font';

import Navbar from '../components/Navbar/Navbar';

import Constants from 'expo-constants';
import MainHomeView from '../components/Home/MainHomeView';
import { gStyles } from '../global.style';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { login } from '../src/actions/auth';

function Home(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato-Regular.ttf')
    });
    const [cart, setCart] = useState([]);
    useEffect(() => {
        console.log(props)
    }, [])
    return(
        <View style={styles.container}>
            <Navbar navigation={props.navigation} cart={cart} />
            <Text>{props.loggedIn? 'hey': 'hi'}</Text>
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

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (account) => dispatch(login(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
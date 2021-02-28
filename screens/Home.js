import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import AnimatedSplash from "react-native-animated-splash-screen";

import Navbar from '../components/Navbar/Navbar';

import Constants from 'expo-constants';
import MainHomeView from '../components/Home/MainHomeView';
import { gStyles } from '../global.style';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { login } from '../src/actions/auth';

function Home(){
    return(
            <View style={styles.container}>
                <StatusBar backgroundColor={gStyles.background} style="dark" />
                <Navbar searchbar />
                <ScrollView style={{height: Dimensions.get('window').height - 60}}>
                    <MainHomeView />
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gStyles.background,
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
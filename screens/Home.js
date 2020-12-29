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

function Home(props){
    const [fontsLoaded] = useFonts({
      'Lato': require('../assets/fonts/Lato-Regular.ttf')
    });
    const scrollRef = useRef(); 
    useEffect(() =>  {
        const unsubscribe = props.navigation.addListener('blur', () => {
            scrollRef.current.scrollTo({
                y: 0,
                animated: true,
            });
        });
        return unsubscribe;
    }, [props.navigation])
    return(
            <View style={styles.container}>
                <StatusBar backgroundColor={gStyles.background} style="dark" />
                <Navbar searchbar navigation={props.navigation} />
                <ScrollView ref={scrollRef} style={{height: Dimensions.get('window').height - 60}}>
                    <MainHomeView navigation={props.navigation} />
                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Lato',
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
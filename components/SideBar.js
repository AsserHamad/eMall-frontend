import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import Constants from 'expo-constants';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { connect } from 'react-redux';
import { logout } from '../src/actions/auth';


function SideBar(props) {
    return (
        <View>
            <View style={styles.topView}>
                <ImageBackground style={styles.topDots} imageStyle={{borderRadius:100}} source={{uri: 'https://cdn.hipwallpaper.com/i/29/69/M5kWUT.png'}}>
                    <View style={styles.logoContainer}>
                        {props.loggedIn ? <Image source={require('../assets/logoM.png')} style={styles.logo} /> : 
                        <Image source={require('../assets/logo.png')} style={styles.logo} />} 
                    </View>
                </ImageBackground>
            </View>
            <ScrollView style={styles.container}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </ScrollView>
        </View>
    )
    };

const styles = StyleSheet.create({
    topView: {
        marginTop: Constants.statusBarHeight,
        width: '100%',
        height: 180,
        backgroundColor: gStyles.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topDots: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: gStyles.background,
        borderWidth: 4,
        borderColor: gStyles.secondary,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    container: {
        right: 0,
    },
});

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (account) => dispatch(logout(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
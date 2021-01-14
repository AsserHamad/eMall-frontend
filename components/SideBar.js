import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { Dimensions, Image, ImageBackground, StyleSheet,Text,View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { connect } from 'react-redux';
import { logout } from '../src/actions/auth';
import { changeLanguage } from '../src/actions/general';
import { useLanguageText, useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

function SideBar(props) {
    const language = useLanguage();
    const languageText = useLanguageText('sidebar');
    const changeLanguage = () => {
        const newLang = `${language === 'en' ? 1 : 0}`;
        console.log('language', language, 'newLang', newLang);
        AsyncStorage.setItem('@language', newLang)
        .then(() => {
            Updates.reloadAsync()
        })
    }
    return (
        <View style={{...styles.container}}>
            <View style={styles.topView}>
                <ImageBackground style={styles.topDots} imageStyle={{borderRadius:100}} source={{uri: 'https://cdn.hipwallpaper.com/i/29/69/M5kWUT.png'}}>
                    <View style={styles.logoContainer}>
                        {props.loggedIn ? <Image source={{uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} style={styles.logo} /> : 
                        <Image source={require('../assets/logoM.png')} style={styles.logo} />} 
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList labelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo'}} {...props} />
                </DrawerContentScrollView>
            </ScrollView>
            <View style={styles.logoutContainer}>
            {props.loggedIn && 
                    <TouchableOpacity onPress={() => {props.logout(); props.navigation.closeDrawer()}}>
                        <TextLato>{language.logout}</TextLato>
                    </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => {changeLanguage()}}>
                <TextLato reverse>{languageText && languageText.changeLanguage}</TextLato>
            </TouchableOpacity>
            </View>
        </View>
    )
    };

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    topView: {
        marginTop: Constants.statusBarHeight,
        width: '100%',
        height: 180,
        backgroundColor: gStyles.primary_medium,
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
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    logo: {
        backgroundColor: gStyles.background,
        borderWidth: 4,
        borderColor: gStyles.secondary,
        width: 100,
        height: 100,
        borderRadius: 100
    },
    logoutContainer: {
        position: 'absolute',
        bottom: height * 0.03,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        account: state.authReducer.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (account) => dispatch(logout(account)),
        changeLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
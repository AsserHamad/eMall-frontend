import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { Dimensions, Image, ImageBackground, StyleSheet,Text,View } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { connect } from 'react-redux';
import { logout } from '../src/actions/auth';
import { changeLanguage } from '../src/actions/general';
import { useLanguageText, useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

function StoreSideBar(props) {
    const language = useLanguage();
    const languageText = useLanguageText('sidebar');
    const changeLanguage = () => {
        const newLang = `${language === 'en' ? 1 : 0}`;
        AsyncStorage.setItem('@language', newLang)
        .then(() => {
            Updates.reloadAsync()
        })
    }
    return (
        <View style={{...styles.container}}>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile')} style={styles.topView}>
                <ImageBackground style={styles.topDots} imageStyle={{borderRadius:100}} source={{uri: 'https://cdn.hipwallpaper.com/i/29/69/M5kWUT.png'}}>
                    <View style={styles.logoContainer}>
                        {props.loggedIn ? <Image source={{uri: 'https://p.favim.com/orig/2018/10/01/cartoon-profile-picture-cute-Favim.com-6346120.jpg'}} style={styles.logo} /> : 
                        <Image source={require('../assets/logoM.png')} style={styles.logo} />} 
                    </View>
                    <View style={styles.logoContainer}>
                        {props.loggedIn ? <Image source={{uri: props.store.logo}} style={styles.logo} /> : 
                        <Image source={require('../assets/logoM.png')} style={styles.logo} />} 
                    </View>
                </ImageBackground>
                {props.loggedIn ? <TextLato light style={styles.name}>{props.account.name}</TextLato>: null}
            </TouchableWithoutFeedback>
            <ScrollView>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList labelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo'}} {...props} />
                </DrawerContentScrollView>
            </ScrollView>
            <View style={styles.logoutContainer}>
            {props.loggedIn && 
                    <TouchableOpacity onPress={() => { props.navigation.closeDrawer();props.logout()}}>
                        <TextLato>{languageText.logout}</TextLato>
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
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        backgroundColor: gStyles.color_3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: RFPercentage(2.5),
        marginVertical: height * 0.01,
        color: '#aaa'
    },
    topDots: {
        width: 150,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.05,
        flexDirection: 'row'
        
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
        
    },
    logo: {
        backgroundColor: gStyles.background,
        width: 80,
        height: 80,
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
        account: state.authReducer.account,
        store: state.authReducer.store
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (account) => dispatch(logout(account)),
        changeLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSideBar);
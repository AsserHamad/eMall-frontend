import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { Dimensions, Image, ImageBackground, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { gStyles } from '../global.style';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../src/actions/auth';
import { setCart } from '../src/actions/cart';
import { changeLanguage, changeFirstTime } from '../src/actions/general';
import { useLanguageText, useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

function SideBar(props) {
    const language = useLanguage();
    const languageText = useLanguageText('sidebar');
    const dispatch = useDispatch();
    const changeLanguage = () => {
        const newLang = `${language === 'en' ? 1 : 0}`;
        AsyncStorage.setItem('@language', newLang)
        .then(() => {
            Updates.reloadAsync()
        })
    }
    return (
        <View style={{...styles.container}}>
            {props.loggedIn ? (
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('Profile')}>
                <ImageBackground source={{uri: 'https://image.freepik.com/free-vector/red-geometrical-halftone-curved-star-pattern-background_1164-1624.jpg'}} style={styles.topView} imageStyle={{opacity: 0.6}}>
                    <Image style={styles.topDots} source={{uri: 'https://imgur.com/RwdRLaD.png'}} />
                    <TextLato bold style={styles.name}>{props.account.firstName} {props.account.lastName}</TextLato>
                </ImageBackground>
            </TouchableOpacity>
            ) : (
                <ImageBackground source={{uri: 'https://image.freepik.com/free-vector/red-geometrical-halftone-curved-star-pattern-background_1164-1624.jpg'}} style={styles.topViewU} imageStyle={{opacity: 0.6}}>
                    <TextLato bold style={styles.topTitle}>{language === 'en' ? 'Welcome to eMall': 'مرحبا بكم في eMall' }</TextLato>
                </ImageBackground>
            )}
            <ScrollView>
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => {changeLanguage()}}>
                    <TextLato style={{fontSize: RFPercentage(1.6), color: 'white'}} bold reverse>{languageText && languageText.changeLanguage}</TextLato>
                </TouchableOpacity>
                {props.loggedIn && 
                    <TouchableOpacity style={{...styles.logoutButton, backgroundColor: gStyles.color_3}} onPress={() => { props.navigation.closeDrawer();props.setCart({products: []});AsyncStorage.removeItem('@accessToken');AsyncStorage.removeItem('@refreshToken');AsyncStorage.removeItem('@firstTime');dispatch(changeFirstTime(false));props.logout()}}>
                        <TextLato style={{fontSize: RFPercentage(1.6), color: 'white'}} bold>{languageText.logout}</TextLato>
                    </TouchableOpacity>
                }
            </View>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList labelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo'}} activeTintColor={gStyles.color_0} {...props} />
                </DrawerContentScrollView>
            </ScrollView>
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
        backgroundColor: gStyles.color_1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.3
    },
    topViewU: {
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        backgroundColor: gStyles.color_1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.2
    },
    topTitle: {
        color: 'white',
        fontSize: RFPercentage(3.5),
        textAlign: 'center',
        width: '70%'
    },
    name: {
        fontSize: RFPercentage(2.5),
        color: 'white'
    },
    topDots: {
        width: 100,
        height: 100,
        borderRadius:100,
        marginBottom: height * 0.02
    },
    logoutContainer: {
        paddingVertical: height * 0.02,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width * 0.05
    },
    logoutButton: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        backgroundColor: gStyles.color_2,
        borderRadius: 100,
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.02
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
        setCart: (cart) => dispatch(setCart(cart)),
        changeLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
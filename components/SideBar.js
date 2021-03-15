import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { Dimensions, Image, ImageBackground, StyleSheet,Text,View } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { connect } from 'react-redux';
import { logout } from '../src/actions/auth';
import { setCart } from '../src/actions/cart';
import { changeLanguage } from '../src/actions/general';
import { useLanguageText, useLanguage } from '../hooks/language';
import TextLato from './utils/TextLato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

function SideBar(props) {
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
            {props.loggedIn ? (
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile')}>
                <ImageBackground source={{uri: 'https://static.vecteezy.com/system/resources/previews/000/225/074/original/beach-at-night-illustration-vector.jpg'}} style={styles.topView} imageStyle={{opacity: 0.6}}>
                    <Image style={styles.topDots} source={{uri: 'https://i.imgur.com/Q6x4k3s.png'}} />
                    <TextLato bold style={styles.name}>{props.account.firstName} {props.account.lastName}</TextLato>
                </ImageBackground>
            </TouchableWithoutFeedback>
            ) : (
                <ImageBackground source={{uri: 'https://static.vecteezy.com/system/resources/previews/000/225/074/original/beach-at-night-illustration-vector.jpg'}} style={styles.topViewU} imageStyle={{opacity: 0.6}}>
                    <TextLato bold style={styles.topTitle}>Welcome to eMall</TextLato>
                </ImageBackground>
            )}
            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={() => {changeLanguage()}}>
                    <TextLato bold reverse>{languageText && languageText.changeLanguage} 🌍</TextLato>
                </TouchableOpacity>
                {props.loggedIn && 
                        <TouchableOpacity onPress={() => { props.navigation.closeDrawer();props.setCart({products: []});AsyncStorage.removeItem('@token');props.logout()}}>
                            <TextLato bold>🏃‍♂️ {languageText.logout}</TextLato>
                        </TouchableOpacity>
                }
            </View>
            <ScrollView>
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
        alignItems: 'flex-start',
        paddingHorizontal: width * 0.05
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
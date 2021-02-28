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
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile')}>
                <ImageBackground source={{uri: 'https://static.vecteezy.com/system/resources/previews/000/225/074/original/beach-at-night-illustration-vector.jpg'}} style={styles.topView} imageStyle={{opacity: 0.6}}>
                    <ImageBackground style={styles.topDots} imageStyle={{borderRadius:100}} source={{uri: 'https://i.imgur.com/Q6x4k3s.png'}} />
                    {props.loggedIn ? <TextLato bold style={styles.name}>{props.account.firstName} {props.account.lastName}</TextLato>: null}
                </ImageBackground>
            </TouchableWithoutFeedback>
            <ScrollView>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList labelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo'}} {...props} />
                </DrawerContentScrollView>
            </ScrollView>
            <View style={styles.logoutContainer}>
            {props.loggedIn && 
                    <TouchableOpacity onPress={() => { props.navigation.closeDrawer();props.setCart({products: []});props.logout()}}>
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
        backgroundColor: gStyles.color_1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: RFPercentage(2.5),
        marginVertical: height * 0.03,
        color: 'white'
    },
    topDots: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.05
        
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
        setCart: (cart) => dispatch(setCart(cart)),
        changeLanguage: (language) => dispatch(changeLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
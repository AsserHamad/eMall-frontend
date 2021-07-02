import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import { Dimensions, Image, ImageBackground, StyleSheet,View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
            {/* <View style={styles.topView}> */}
                <ImageBackground style={styles.topDots} source={{uri: 'https://image.freepik.com/free-vector/red-geometrical-halftone-curved-star-pattern-background_1164-1624.jpg'}}>
                    <View style={styles.logoContainer}>
                        <Image source={props.loggedIn ? {uri: props.store.logo} : require('../assets/logoM.png')} style={styles.logo} />
                    </View>
                {props.loggedIn ? <TextLato bold style={styles.name}>{props.account.name}</TextLato>: null}
                </ImageBackground>
            {/* </View> */}
            <ScrollView>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {changeLanguage()}}>
                        <TextLato style={{fontSize: RFPercentage(1.6), color: 'white'}} bold reverse>{languageText && languageText.changeLanguage}</TextLato>
                    </TouchableOpacity>
                    {props.loggedIn && 
                        <TouchableOpacity style={{...styles.logoutButton, backgroundColor: gStyles.color_3}} onPress={() => {props.navigation.closeDrawer();props.logout();AsyncStorage.removeItem('@access_token');}}>
                            <TextLato style={{fontSize: RFPercentage(1.6), color: 'white'}} bold>{languageText.logout}</TextLato>
                        </TouchableOpacity>
                    }
                </View>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList labelStyle={{fontFamily: language === 'en' ? 'Lato' : 'Cairo'}} {...props} />
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: RFPercentage(3),
        marginTop: height * 0.01,
        color: 'white'
    },
    topDots: {
        height: height * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gStyles.color_2,
    },
    logoContainer: {
        width: 100,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 10,
        borderRadius: 100,
        backgroundColor: gStyles.background,
        
    },
    logo: {
        width: 80,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 500
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
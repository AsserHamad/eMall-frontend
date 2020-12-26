import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { Dimensions, Image, ImageBackground, StyleSheet,Text,View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { connect } from 'react-redux';
import { logout } from '../src/actions/auth';
import { changeLanguage } from '../src/actions/general';
import useLanguage from '../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height, ]

function SideBar(props) {
    const [language, languageState] = useLanguage('sidebar');
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
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </ScrollView>
            <View style={styles.logoutContainer}>
            {props.loggedIn && 
                    <TouchableOpacity onPress={() => {props.logout(); props.navigation.closeDrawer()}}>
                        <Text>{language.logout}</Text>
                    </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => {props.changeLanguage(languageState === 0 ? 1 : 0); props.navigation.closeDrawer()}}>
                <Text>{language && language.changeLanguage}</Text>
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
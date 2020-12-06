import React from 'react';
import { StyleSheet, View, Image, Text, Button, Touchable, TouchableWithoutFeedbackComponent, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
// import { useFonts } from 'expo-font';
import Searchbar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { gStyles } from '../../global.style';

function Navbar(props){
    return(
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>

            {/* Search Bar */}
            <Searchbar />

            {/* Burger */}
            <TouchableWithoutFeedback onPress={() => props.setMenu(true)} style={styles.burgerContainer}>
                <FontAwesomeIcon style={{marginLeft: 15}} color={gStyles.secondary} size={ 27 } icon={ faBars }/>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoContainer: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    logo: {
        width: 100,
        height: 50,
        aspectRatio: 1875/870
    },
    burgerContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
})

export default Navbar;
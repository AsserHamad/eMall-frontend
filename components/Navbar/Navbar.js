import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Searchbar from './Searchbar';
import { FontAwesome5 } from '@expo/vector-icons';
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
            <TouchableOpacity style={styles.burgerContainer}>
                <FontAwesome5 name="bars" color={gStyles.secondary} size={ 27 }/>
            </TouchableOpacity>
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
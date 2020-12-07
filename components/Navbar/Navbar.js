import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import Searchbar from './Searchbar';
import { FontAwesome5 } from '@expo/vector-icons';
import { gStyles } from '../../global.style';

const width = Dimensions.get('window').width;

function Navbar(props){
    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                {/* Burger */}
                <TouchableOpacity onPress={props.navigation.openDrawer} style={styles.burgerContainer}>
                    <FontAwesome5 name="bars" color={gStyles.secondary} size={ 27 }/>
                </TouchableOpacity>

                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>
                
                {/* Cart */}
                <TouchableOpacity onPress={() => props.navigation.push('Cart', {text: 'yo'})} style={styles.burgerContainer}>
                    <View style={styles.cartNumberContainer}>
                        <Text>0</Text>
                    </View>
                    <FontAwesome5 name="shopping-cart" color={gStyles.secondary} size={ 27 }/>
                </TouchableOpacity>
            </View>
            {/* Search Bar */}
            <Searchbar />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoContainer: {
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    logo: {
        width: 100,
        height: 50,
        aspectRatio: 1875/870,
        zIndex: 1
    },
    cartNumberContainer: {
        backgroundColor: gStyles.primary,
        width: 18,
        height: 18,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateX: -9}, {translateY: 0}],
        zIndex: 2,
        position: "absolute"
    },
    burgerContainer: {
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
})

export default Navbar;
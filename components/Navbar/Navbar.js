import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import Searchbar from './Searchbar';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { gStyles } from '../../global.style';
import { connect, useSelector } from 'react-redux';
import { useLanguageText, useLanguage } from '../../hooks/language';
import { useNavigation } from '@react-navigation/native';
import TextLato from '../utils/TextLato';

const width = Dimensions.get('window').width;

function Navbar(props){
    const [disabled, setDisabled] = useState(false);
    const language = useLanguage();
    const languageText = useLanguageText('navbar');
    const navigation = useNavigation();
    const cartProducts = useSelector(state => state.cartReducer.cart.products);

    useEffect(() => {
        const timer = setTimeout(() => setDisabled(false), 1000);
        return () => clearTimeout(timer);
    }, [disabled])
    return(
        <View style={styles.container}>
            <View style={getLanguageStyle(language, 'topContainer')}>
                {/* Burger */}
                <TouchableOpacity onPress={navigation.openDrawer} style={styles.burgerContainer}>
                    <FontAwesome5 name="bars" color={gStyles.color_3} size={ 27 }/>
                </TouchableOpacity>

                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logoM.png')} style={styles.logo} />
                </View>
                
                {/* Cart */}
                <TouchableOpacity 
                    disabled={disabled}
                    activeOpacity={0.8}
                    onPress={() => {
                        setDisabled(true);
                        navigation.push('Cart')}
                    }
                    style={styles.burgerContainer}
                >
                    <View style={styles.cartNumberContainer}>
                        <TextLato style={{color: 'black'}}>{cartProducts.length}</TextLato>
                    </View>
                    <FontAwesome5 name="shopping-cart" color={gStyles.color_3} size={ 27 }/>
                </TouchableOpacity>
            </View>
            {/* Search Bar */}
            {props.searchbar && <Searchbar />}

        </View>
    )
}

const getLanguageStyle = (lang, style) => lang === 'ar' ? styles[`${style}_ar`] : styles[style];

const styles = StyleSheet.create({
    container: {
        width,
        paddingTop: Constants.statusBarHeight+ 5,
        paddingBottom: 10,
        alignItems: 'center'
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },
    topContainer_ar: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        height: 45
    },
    logoContainer: {
        width: width * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: 40,
        height: 40,
        zIndex: 1
    },
    cartNumberContainer: {
        backgroundColor: gStyles.color_0,
        minWidth: 18,
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
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import StoreSearchbar from './StoreSearchbar';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';
import { useLanguageText, useLanguage } from '../../hooks/language';
import { useNavigation } from '@react-navigation/native';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';

const width = Dimensions.get('window').width;

function StoreNavbar({searchbar, title}){
    const [disabled, setDisabled] = useState(false);
    const language = useLanguage();
    const navigation = useNavigation();

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
                    <TextLato bold style={{fontSize: RFPercentage(2.5)}}>{title}</TextLato>
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
                </TouchableOpacity>
            </View>
            {/* Search Bar */}
            {searchbar && <StoreSearchbar />}

        </View>
    )
}

const getLanguageStyle = (lang, style) => lang === 'ar' ? styles[`${style}_ar`] : styles[style];

const styles = StyleSheet.create({
    container: {
        width,
        paddingVertical: 10,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center'
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35
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

export default StoreNavbar;
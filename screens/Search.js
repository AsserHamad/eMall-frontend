import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
import { useNavigation } from '@react-navigation/native';
import SellerCardsList from '../components/utils/SellerCardsList';

const SearchPage = (props) => {
    const details = props.route.params;
    const language = useLanguage();
    return (
        <View style={styles.container}>
            <Header search details={{title: details.name[language]}} />
            <SubcategoriesScroll details={details} />
            <SellerCardsList url={`${Constants.manifest.extra.apiUrl}/store/find-by-category`} body={{category: details._id}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        width,
        aspectRatio: 3.9
    },
    sortButton: {
        position: 'absolute',
        width: width * 0.2,
        height: width * 0.2,
        zIndex: 2,
        bottom: height * 0.03,
        right: width * 0.08,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});

export default SearchPage;
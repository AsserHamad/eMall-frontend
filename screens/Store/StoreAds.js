import React, { useState, useEffect } from 'react';
import { View, Image, ScrollableView, StyleSheet, Dimensions } from 'react-native';
import Header from '../../components/Header';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import { gStyles } from '../../global.style';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../../components/utils/Reviews';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeComponent from '../../components/Store/HomeComponent';
import BrowseComponent from '../../components/Store/BrowseComponent';
import ReviewsComponent from '../../components/Store/ReviewsComponent';
import StorePageDashboard from './StorePageDashboard.';
import { SafeAreaView } from 'react-navigation';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const adImage_0 = "https://imgur.com/83ifs22.png";
const adImage_1 = "https://imgur.com/C5KLvi8.png";
const adImage_2 = "https://imgur.com/L8t7Enp.png";

const StoreAds = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StoreNavbar title={'Advertisements'} />
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Image style={{width: width * 0.75, aspectRatio: 819/488}} source={{uri: 'https://i.imgur.com/dydF1FY.png'}} />
                    <TextLato italic style={styles.title}>Press on the ad type that you'd like to explore, You can either advertise your store page or a specific product</TextLato>
                </View>

                {/* Home Ads */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('HomeAds')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>Home Page Header Ad</TextLato>
                    <TextLato italic style={styles.adTitle}>An ad that is front and center in the app's view. It is the first thing you are welcomed to when opening the app, and is the most accessible ad type.</TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_0}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

                {/* Banner Ads */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('BannerAds')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>Home Page Banner Ad</TextLato>
                    <TextLato italic style={styles.adTitle}>An ad that is viewed to whoever is most relevantly associated with your product type. </TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_1}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

                {/* Deal of the Day */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('DealsOfTheDay')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>Deal of the Day</TextLato>
                    <TextLato italic style={styles.adTitle}>A one-day deal on one of your products, no promo code needed. (Starts the following day and ends on 11:59 pm Cairo time)</TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_2}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    adContainer: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        marginTop: height * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    titleContainer: {
        marginTop: height * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.02,
    },
    title: {
        fontSize: RFPercentage(1.6),
        color: 'black',
        textAlign: 'center'
    },
    typeTitle: {
        fontSize: RFPercentage(3),
        textAlign: 'center'
    },
    typeImage: {
        width: width * 0.7,
        aspectRatio: 375/700,
        borderRadius: 20,
    },
    adTitle: {
        fontSize: RFPercentage(1.8),
        color: '#555',
        marginVertical: height * 0.01,
        textAlign: 'center'
    },
})

export default StoreAds;
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const adImage_0 = "https://imgur.com/83ifs22.png";
const adImage_1 = "https://imgur.com/C5KLvi8.png";
const adImage_2 = "https://imgur.com/L8t7Enp.png";

const StoreAds = ({navigation}) => {
    const text = useLanguageText('sellerAds');
    return (
        <View style={styles.container}>
            <StoreNavbar title={text.title} />
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Image style={{width: width * 0.75, aspectRatio: 819/488}} source={{uri: 'https://imgur.com/2Y21sse.png'}} />
                    <TextLato italic style={styles.title}>{text.description}</TextLato>
                </View>

                {/* Home Ads */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('HomeAds')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>{text.homeAd}</TextLato>
                    <TextLato italic style={styles.adTitle}>{text.homeAdDescription}</TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_0}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

                {/* Banner Ads */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('BannerAds')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>{text.bannerAd}</TextLato>
                    <TextLato italic style={styles.adTitle}>{text.bannerAdDescription}</TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_1}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

                {/* Deal of the Day */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('DealsOfTheDay')} style={styles.adContainer}>
                    <TextLato bold style={styles.typeTitle}>{text.dealOfTheDay}</TextLato>
                    <TextLato italic style={styles.adTitle}>{text.dealOfTheDayDescription}</TextLato>
                    <View style={{alignItems: 'center', marginTop: height * 0.02}}>
                        <Image source={{uri: adImage_2}} style={styles.typeImage} />
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
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
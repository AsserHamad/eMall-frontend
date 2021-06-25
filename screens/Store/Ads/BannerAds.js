import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Switch, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import TextLato from '../../../components/utils/TextLato';
import Header from '../../../components/Header';
import { gStyles } from '../../../global.style';
import { funcs } from '../../../global.funcs';
import ProductPicker from '../../../components/utils/ProductPicker';
import useCredit from '../../../hooks/credit';
import Icon from '../../../components/utils/Icon';
import { useLanguage, useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const BannerAds = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [image, setImage] = useState('https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png');
    const [adType, setAdType] = useState(0);
    const [pickedProduct, setPickedProduct] = useState(null);
    const credit = useCredit(loading);
    const token = useSelector(state => state.authReducer.token);

    const text = useLanguageText('sellerBannerAds');

    const fetchBanners = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/banner`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setAds(res);
        })
    }
    useEffect(() => {
        fetchBanners();
    }, []);

    useEffect(() => {
        setDisabled(!(image && credit >= 20 && (adType || pickedProduct)))
    }, [image, credit, adType, pickedProduct]);

    const createBanner = () => {
        if(disabled) return;

        setLoading(true);
        funcs.uploadImage(image, 'banner_', token)
        .then(res => {
            fetch(`${Constants.manifest.extra.apiUrl}/advertisement/banner`, {
                method: 'post',
                headers: {'Content-Type': 'application/json', token},
                body: JSON.stringify({
                    adType,
                    image: res.location,
                    product: pickedProduct
                })
            })
            .then(() => {
                fetchBanners();
            })
        })
    }

    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <ScrollView contentContainerStyle={{paddingVertical: height * 0.04}}>
                <KeyboardAvoidingView style={{marginHorizontal: width * 0.05}}>
                            {/* Active Ads */}
                            <TextLato style={{fontSize: RFPercentage(3)}} bold>{text.active}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.005, marginBottom: height * 0.02}} italic>{text.activeDescription}</TextLato>
                                <TextLato italic style={{fontSize: RFPercentage(1.7)}}>{text.renewalRate} <TextLato style={{color: 'red'}}>20 {text.rate}</TextLato></TextLato>

                            {loading ? (

                                // ? Loading View
                                <View style={{height: height * 0.2, justifyContent: 'center', alignItems: 'center'}}>
                                    <ActivityIndicator color={gStyles.color_0} size={RFPercentage(5)} />
                                </View>
                            ): ads.length ? 
                            ads.map(ad => {
                                
                                // * Active Ads View
                                return <BannerAd key={Math.random()} text={text} ad={ad} />
                            }) : (

                                // ! No Active Ads View
                                <View style={{backgroundColor: gStyles.color_0, justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.07, marginTop: height * 0.02}}>
                                    <TextLato italic style={{color: 'white'}}>{text.noAds}</TextLato>
                                </View>
                            )}
                            
                            {/* Header */}
                            <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>{text.addAd}</TextLato>

                            {/* Detailss */}
                            <View style={{marginTop: height * 0.01}}>
                                <TextLato style={{fontSize: RFPercentage(1.7)}}>Store Credit: <TextLato style={{color: gStyles.color_0}}>{credit} EGP</TextLato></TextLato>
                                <TextLato italic style={{fontSize: RFPercentage(1.7)}}>Ad Price: <TextLato style={{color: 'red'}}>20 EGP/week</TextLato></TextLato>
                            </View>

                            {/* Image Picker */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>Pick an image for your Ad</TextLato>
                                <View style={styles.profilePictureContainer}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => funcs.chooseImage(setImage)}>
                                        <Image source={{ uri: image }} style={{ width: '100%', aspectRatio: 2.5 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Ad Type */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>What are you advertising</TextLato>
                                <View style={{flexDirection: 'row', marginTop: height * 0.02}}>
                                    <TouchableOpacity activeOpacity={0.8} key={Math.random()} style={{...styles.adButton, backgroundColor: adType === 0 ? gStyles.color_1 : gStyles.color_0}} onPress={() => setAdType(0)}>
                                        <TextLato style={{color: 'white'}}>Product</TextLato>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} key={Math.random()} style={{...styles.adButton, backgroundColor: adType === 1 ? gStyles.color_1 : gStyles.color_0}} onPress={() => setAdType(1)}>
                                        <TextLato style={{color: 'white'}}>Store</TextLato>
                                    </TouchableOpacity>
                                </View>
                                {adType === 0 && <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} style={{marginTop: height * 0.03,height: height * 0.5}} />}
                            </View>

                            {/* Purchase button */}
                            <TouchableOpacity onPress={createBanner} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_1}}>
                                <TextLato style={{color: 'white'}}>PURCHASE</TextLato>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const BannerAd = ({ad, text}) => {
    const [banner, setBanner] = useState(ad);
    const [renew, setRenew] = useState(ad.renew);
    const date = new Date(banner.lastRenew);
    const language = useLanguage();
    const en = language === 'en';
    const nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    const token = useSelector(state => state.authReducer.token);

    const updateBanner = (val) => {
        setRenew(val);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/banner`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({
                bannerAd: {
                    _id: ad._id,
                    renew: val
                }
            })
        })
        .then(res => res.json())
        .then(res => {
            setBanner(res);
        })
        .catch(err => console.log(err));
    }

    return (
        <View style={styles.adContainer}>
            <Image style={styles.highestImage} source={{uri: banner.image}} />
            <TextLato italic style={{fontSize: RFPercentage(2), color: '#777', marginTop: height * 0.007}}>{text.lastRenewal} {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</TextLato>
            <TextLato italic style={{fontSize: RFPercentage(2), color: 'red', marginTop: height * 0.007}}>{text.renewalOn} {nextWeek.getDate()}-{nextWeek.getMonth() + 1}-{nextWeek.getFullYear()}</TextLato>
            <View style={{flexDirection: en ? 'row' : 'row-reverse', marginVertical: height * 0.02, alignItems: 'center'}}>
                <TextLato style={{fontSize: RFPercentage(2), marginRight: width * 0.02}}>{text.autoRenewal}</TextLato>
                <Icon name={'refresh-ccw'} type={'Feather'} size={RFPercentage(2)} style={{marginHorizontal: width * 0.05}} />
                <Switch
                    trackColor={{ false: '#ccc', true: "#0FA2FE" }}
                    thumbColor={'#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => updateBanner(!renew)}
                    value={renew}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        marginVertical: height * 0.,
        marginHorizontal: width * 0.05,
    },
    adContainer: {
        borderRadius: 10,
        marginVertical: height * 0.005, 
        paddingHorizontal: width * 0.05, 
        paddingVertical: height * 0.01,
        shadowColor: "#000",
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
    highestImage: {
        marginTop: height * 0.01,
        width: '100%',
        aspectRatio: 2.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    },
    input: {
        width: width * 0.3, 
        borderColor: gStyles.color_0, 
        borderBottomWidth: 2, 
        fontSize: RFPercentage(3),
        paddingHorizontal: width * 0.02
    },
    profilePictureContainer: { 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    submitButton: {
        width: width * 0.9,
        paddingVertical: height * 0.01,
        marginTop: height * 0.03,
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    adButton: {
        width: width * 0.3,
        paddingVertical: height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.02,
        borderRadius: 10
    }
})

export default BannerAds;
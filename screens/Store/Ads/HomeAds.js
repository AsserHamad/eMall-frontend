import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import TextLato from '../../../components/utils/TextLato';
import { gStyles } from '../../../global.style';
import { funcs } from '../../../global.funcs';
import ProductPicker from '../../../components/utils/ProductPicker';
import useCredit from '../../../hooks/credit';
import Header from '../../../components/Header';
import { useLanguage, useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const HomeAds = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState({});
    const [highestBid, setHighestBid] = useState({});
    const [bid, setBid] = useState("0");
    const [disabled, setDisabled] = useState(true);
    const [image, setImage] = useState(undefined);
    const [adType, setAdType] = useState(0);
    const [pickedProduct, setPickedProduct] = useState(null);
    const credit = useCredit(loading);
    const token = useSelector(state => state.authReducer.token);
    const text = useLanguageText('sellerHomeAds');
    const language = useLanguage();
    const en = language === 'en';

    const getPageAd = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home/current/${page}`)
        .then(res => res.json())
        .then(({current, highestBid}) => {
            setCurrent(current);
            setHighestBid(highestBid);
            setLoading(false);
        })
    }

    const updateBid = () => {
        funcs.uploadImage(image, 'home_ad_', token)
        .then(res => {
            fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home/bid`, {
                method: 'post',
                headers: {'Content-Type': 'application/json', token},
                body: JSON.stringify({
                    page,
                    adType,
                    image: res.location,
                    product: pickedProduct ? pickedProduct._id : null,
                    bid: Number(bid),
                    page
                })
            })
            .then(() => getPageAd())
        })
    }
    
    useEffect(() => {
        getPageAd();
    }, [page]);

    useEffect(() => {
        setDisabled(!(image && (!highestBid || bid >= highestBid.bid + 10) && bid <= credit && (adType || pickedProduct)))
    }, [bid, adType, pickedProduct, image, loading]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.04}}>
                <Header details={{title: text.homeHeader}} />
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.02}}>
                    <TextLato style={{fontSize: RFPercentage(2), color: '#777'}}>{text.homeTitle}</TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(1.7), marginTop: height * 0.01}}>{text.homeSubtitle}</TextLato>
                </View>
                <View style={{...styles.buttonsContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
                    {[0, 1, 2, 3, 4].map(pageNo => {
                        const samePage = pageNo === page;
                        return (
                            <TouchableOpacity key={pageNo} style={{...styles.button, backgroundColor: samePage ? gStyles.color_1 : gStyles.color_0}} onPress={() => setPage(pageNo)}>
                                <TextLato style={{color: 'white'}}>{pageNo + 1}</TextLato>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {loading ? (
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '80%'}}><ActivityIndicator size={width * 0.2} color={gStyles.color_0} /></View>
                ) : highestBid ?
                (
                <View style={styles.mainContainer}>
                    <TextLato bold>{text.highestBidder}</TextLato>
                    <Image source={{uri: highestBid.image}} style={styles.highestImage} />
                    <TextLato style={{marginTop: height * 0.01, fontSize: RFPercentage(3), color: gStyles.color_1}} bold >{highestBid.store.title}</TextLato>
                    <TextLato style={{marginTop: height * 0.01, fontSize: RFPercentage(2.2)}} >{text.bidAmount}  {highestBid.bid} {text.egp}</TextLato>
                    
                </View>  
                ) : (
                <View style={{backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.05, paddingHorizontal: width * 0.1, borderRadius: 5, marginHorizontal: width * 0.05, marginVertical: height * 0.03}}>
                    <TextLato style={{fontSize: RFPercentage(2), textAlign: 'center', color: 'white'}}>{text.noBids}</TextLato>
                </View> 
                )}
                <KeyboardAvoidingView style={{marginHorizontal: width * 0.05}}>
                            <TextLato style={{fontSize: RFPercentage(3)}} bold>{text.bid}{highestBid && text.higher}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.005}} italic>{text.bidHigherDescription}</TextLato>
                            <TextLato>{text.storeCredit}: {credit} {text.egp}</TextLato>

                            {/* Input */}
                            <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginTop: height * 0.03}}>
                                <TextInput 
                                    keyboardType={'number-pad'}
                                    value={bid}
                                    placeholder={"0.00"}
                                    onChangeText={input => input.match(/^[0-9]*$/) ? setBid(input) : null}
                                    style={{...styles.input, textAlign: en ? 'left' : "right"}} />
                                <TextLato italic style={{fontSize: RFPercentage(3), marginHorizontal: width * 0.02}}>{text.egp}</TextLato>
                            </View>

                            {/* Image Picker */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>{text.pickImage}</TextLato>
                                <View style={styles.profilePictureContainer}>
                                    <TouchableOpacity onPress={() => funcs.chooseImage(setImage, [2.5, 1])}>
                                        <Image source={{ uri: image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' }} style={{ width: '100%', aspectRatio: 2.5 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Ad Type */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>{text.type}</TextLato>
                                <View style={{flexDirection: en ? 'row' : 'row-reverse', marginTop: height * 0.02}}>
                                    <TouchableOpacity activeOpacity={0.8} style={{...styles.adButton, backgroundColor: adType === 0 ? gStyles.color_1 : gStyles.color_0}} onPress={() => setAdType(0)}>
                                        <TextLato style={{color: 'white'}}>{text.product}</TextLato>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} style={{...styles.adButton, backgroundColor: adType === 1 ? gStyles.color_1 : gStyles.color_0}} onPress={() => setAdType(1)}>
                                        <TextLato style={{color: 'white'}}>{text.store}</TextLato>
                                    </TouchableOpacity>
                                </View>
                                {adType === 0 && <ScrollView style={{maxHeight: height * 0.7, marginTop: height * 0.04}}><ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} style={{marginTop: height * 0.03}} /></ScrollView>}
                            </View>

                            {/* Bid button */}
                            <TouchableOpacity onPress={() => !disabled ? updateBid() : null} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? '#aaa' : gStyles.color_2}}>
                                <TextLato style={{color: 'white'}}>{text.bidButton}</TextLato>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: width * 0.05,
        marginTop: height * 0.02
    },
    button: {
        width: width * 0.1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.02,
        borderRadius: 10
    },
    mainContainer: {
        marginVertical: height * 0.03,
        marginHorizontal: width * 0.05,
    },
    highestImage: {
        marginTop: height * 0.01,
        width: '100%',
        aspectRatio: 2.5
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
        marginTop: height * 0.02
    },
    submitButton: {
        width: width * 0.9,
        paddingVertical: height * 0.01,
        marginTop: height * 0.07,
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

export default HomeAds;
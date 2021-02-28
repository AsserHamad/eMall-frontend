import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import TextLato from '../../../components/utils/TextLato';
import { gStyles } from '../../../global.style';
import * as ImagePicker from 'expo-image-picker';
import ProductPicker from '../../../components/utils/ProductPicker';
import useCredit from '../../../hooks/credit';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const HomeAds = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState({});
    const [highestBid, setHighestBid] = useState({});
    const [pickedImage, setPickedImage] = useState(false);
    const [bid, setBid] = useState("0");
    const [disabled, setDisabled] = useState(true);
    const store = useSelector(state => state.authReducer.account);
    const [image, setImage] = useState('https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png');
    const [adType, setAdType] = useState(0);
    const [pickedProduct, setPickedProduct] = useState(null);
    const credit = useCredit(loading);
    const token = useSelector(state => state.authReducer.token);
    
    // Get image permission
    useEffect(() => {
        (async () => {
            if(Platform.OS !== 'web'){
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if(status !== 'granted') {
                    alert('Sorry, we need camera roll permission to register!')
                }
            }
        })();
    }, []);
    
    // Pick image
    const pickImage = async () => {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [2.5, 1],
          quality: 1,
        })
        .then(res => {
            console.log(res);
            setPickedImage(true);
            if(!res.cancelled) {
                setImage(res.uri);
            }
        })
    }

    const getPageAd = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home/current/${page}`)
        .then(res => res.json())
        .then(({current, highestBid}) => {
            console.log(current, highestBid)
            setCurrent(current);
            setHighestBid(highestBid);
            setLoading(false);
        })
    }

    const updateBid = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home/bid`, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({
                page,
                adType,
                image: 'https://impakter.com/wp-content/uploads/2018/07/body-shop-banner-1.png',
                product: pickedProduct ? pickedProduct._id : null,
                bid: Number(bid),
                page
            })
        })
        .then(() => getPageAd())
    }
    
    useEffect(() => {
        getPageAd();
    }, [page]);

    useEffect(() => {
        console.log(!(pickedImage && (!highestBid || bid >= highestBid.bid + 10) && bid <= credit && (adType || pickedProduct)))
        setDisabled(!(pickedImage && (!highestBid || bid >= highestBid.bid + 10) && bid <= credit && (adType || pickedProduct)))
    }, [bid, adType, pickedProduct, pickedImage, loading]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.04}}>
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.02}}>
                    <TextLato style={{fontSize: RFPercentage(2), color: '#777'}}>Choose the page which you would like to bid on</TextLato>
                    <TextLato italic style={{fontSize: RFPercentage(1.7), marginTop: height * 0.01}}>*This ad type works on a bidding system. Bid the highest number to get the following week's spot on your preferred page.</TextLato>
                </View>
                <View style={styles.buttonsContainer}>
                    {[0, 1, 2, 3, 4].map(pageNo => {
                        const samePage = pageNo === page;
                        return (
                            <TouchableOpacity key={Math.random()} style={{...styles.button, backgroundColor: samePage ? gStyles.color_1 : gStyles.color_0}} onPress={() => setPage(pageNo)}>
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
                    <TextLato bold>Current Highest Bidder</TextLato>
                    <Image source={{uri: highestBid.image}} style={styles.highestImage} />
                    <TextLato style={{marginTop: height * 0.01, fontSize: RFPercentage(3), color: gStyles.color_1}} bold >{highestBid.store.title}</TextLato>
                    <TextLato style={{marginTop: height * 0.01, fontSize: RFPercentage(2.2)}} >Bid Amount:  {highestBid.bid} EGP</TextLato>
                    
                </View>  
                ) : (
                <View style={{backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.05, paddingHorizontal: width * 0.1, borderRadius: 5, marginHorizontal: width * 0.05, marginVertical: height * 0.03}}>
                    <TextLato style={{fontSize: RFPercentage(2), textAlign: 'center', color: 'white'}}>No Currently Placed Bids, Claim Your Spot Now!</TextLato>
                </View> 
                )}
                <KeyboardAvoidingView style={{marginHorizontal: width * 0.05}}>
                            <TextLato style={{fontSize: RFPercentage(3)}} bold>Bid{highestBid && ' Higher'}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.005}} italic>You have to bid at least 10 EGP higher than the highest bid. You cannot bid more than your store credit.</TextLato>
                            <TextLato>Store Credit: {credit} EGP</TextLato>

                            {/* Input */}
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: height * 0.03}}>
                                <TextInput 
                                    keyboardType={'number-pad'}
                                    value={bid}
                                    placeholder={"0.00"}
                                    onChangeText={input => input.match(/^[0-9]*$/) ? setBid(input) : null}
                                    style={styles.input} />
                                <TextLato italic style={{fontSize: RFPercentage(3), marginHorizontal: width * 0.02}}>EGP</TextLato>
                            </View>

                            {/* Image Picker */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>Pick an image for your Ad</TextLato>
                                <View style={styles.profilePictureContainer}>
                                    <TouchableOpacity onPress={pickImage}>
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
                                {adType === 0 && <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} style={{marginTop: height * 0.03}} />}
                            </View>

                            {/* Bid button */}
                            <TouchableOpacity onPress={() => !disabled ? updateBid() : null} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_1}}>
                                <TextLato style={{color: 'white'}}>BID</TextLato>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
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
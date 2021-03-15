import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Switch, Text, View } from 'react-native';
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
import Icon from '../../../components/utils/Icon';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const BannerAds = () => {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [pickedImage, setPickedImage] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [image, setImage] = useState('https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png');
    const [adType, setAdType] = useState(0);
    const [pickedProduct, setPickedProduct] = useState(null);
    const credit = useCredit(loading);
    const token = useSelector(state => state.authReducer.token);

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
            setPickedImage(true);
            if(!res.cancelled) {
                setImage(res.uri);
            }
        })
    }

    const createBanner = () => {
        if(disabled) return;

        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/banner`, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({
                adType,
                image,
                product: pickedProduct
            })
        })
        .then(() => {
            fetchBanners();
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingVertical: height * 0.04}}>
                <KeyboardAvoidingView style={{marginHorizontal: width * 0.05}}>
                            {/* Active Ads */}
                            <TextLato style={{fontSize: RFPercentage(3)}} bold>Active Ads</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.005, marginBottom: height * 0.02}} italic>These ads are shown to the most appropriate clients that would have a higher probability of being interested in them.</TextLato>
                                <TextLato italic style={{fontSize: RFPercentage(1.7)}}>Renewal Rate: <Text style={{color: 'red'}}>20 EGP/week</Text></TextLato>

                            {loading ? (

                                // ? Loading View
                                <View style={{height: height * 0.2, justifyContent: 'center', alignItems: 'center'}}>
                                    <ActivityIndicator color={gStyles.color_0} size={RFPercentage(5)} />
                                </View>
                            ): ads.length ? 
                            ads.map(ad => {
                                
                                // * Active Ads View
                                return <BannerAd ad={ad} />
                            }) : (

                                // ! No Active Ads View
                                <View style={{backgroundColor: gStyles.color_0, justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.07, marginTop: height * 0.02}}>
                                    <TextLato italic style={{color: 'white'}}>You do not currently have any active ads :(</TextLato>
                                </View>
                            )}
                            
                            {/* Header */}
                            <TextLato style={{fontSize: RFPercentage(3), marginTop: height * 0.03}} bold>Add an Ad</TextLato>

                            {/* Detailss */}
                            <View style={{marginTop: height * 0.01}}>
                                <TextLato style={{fontSize: RFPercentage(1.7)}}>Store Credit: <Text style={{color: gStyles.color_0}}>{credit} EGP</Text></TextLato>
                                <TextLato italic style={{fontSize: RFPercentage(1.7)}}>Ad Price: <Text style={{color: 'red'}}>20 EGP/week</Text></TextLato>
                            </View>

                            {/* Image Picker */}
                            <View>
                                <TextLato bold style={{marginTop: height * 0.03}}>Pick an image for your Ad</TextLato>
                                <View style={styles.profilePictureContainer}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
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

                            {/* Purchase button */}
                            <TouchableOpacity onPress={createBanner} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_1}}>
                                <TextLato style={{color: 'white'}}>PURCHASE</TextLato>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

const BannerAd = ({ad}) => {
    const [banner, setBanner] = useState(ad);
    const [renew, setRenew] = useState(ad.renew);
    const date = new Date(banner.created_at);
    const nextWeek = new Date(Date.now() + 6.048e+8);
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
            <TextLato italic style={{fontSize: RFPercentage(2), color: '#777', marginTop: height * 0.007}}>Active since {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</TextLato>
            <TextLato italic style={{fontSize: RFPercentage(2), color: 'red', marginTop: height * 0.007}}>Renewal on {nextWeek.getDate()}-{nextWeek.getMonth() + 1}-{nextWeek.getFullYear()}</TextLato>
            <View style={{flexDirection: 'row', marginVertical: height * 0.02, alignItems: 'center'}}>
                <TextLato style={{fontSize: RFPercentage(2), marginRight: width * 0.02}}>Auto-renewal</TextLato>
                <Icon name={'refresh-ccw'} type={'Feather'} size={RFPercentage(2)} style={{marginRight: width * 0.05}} />
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
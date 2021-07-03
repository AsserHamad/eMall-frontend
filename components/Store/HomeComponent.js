import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import SellerCardProduct from '../cards/Seller/SellerCardProduct'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { gStyles } from '../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const HomeComponent = ({ homeAds, showToast, en = true }) => {
    return (
        <View>
            {homeAds.map(ad => {
                switch(ad.adType){
                    case 0:
                        return <HomeAdType_0 key={ad._id} ad={ad} />
                    case 1:
                        return <HomeAdType_1 showToast={showToast} key={ad._id} ad={ad} en={en} />
                    case 2:
                        return <HomeAdType_2 key={ad._id} ad={ad} />
                    default:
                         return null;
                }
            })}
        </View>
    )
}

const HomeAdType_0 = ({ad}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height));
        setLoading(false);
    }, []);
    if(loading)
        return (
            <View style={{width, aspectRatio: 20/9, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={gStyles.color_2} size={RFPercentage(4)} />
            </View>
        )
    return (
        <View>
            <Image source={{uri: ad.image}} style={{width, aspectRatio}} />
        </View>
    )
}

const HomeAdType_1 = ({ad, showToast, en}) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/${ad.product}`)
        .then(res => res.json())
        .then(prdct => {setProduct(prdct)})
        .catch(err => console.log(err));
    }, []);
    if(!product)
    return (
        <View style={{height: height * 0.15, paddingVertical: height * 0.1}}>
            <ActivityIndicator size={RFPercentage(5)} color={gStyles.color_2} />
        </View>
    )
    return (
            <SellerCardProduct showToast={showToast} product={product} style={{transform: en ? [] : [{scaleX: -1}]}} />
    )
}

const HomeAdType_2 = ({ad}) => {
    const navigation = useNavigation();
    const [aspectRatio, setAspectRatio] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height));
        setLoading(false);
    }, []);
    if(loading)
        return (
            <View style={{width, aspectRatio: 20/9, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={gStyles.color_2} size={RFPercentage(4)} />
            </View>
        )
    return (
        <View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product:{_id: ad.product}})}>
                <Image source={{uri: ad.image}} style={{width, aspectRatio}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    productImage: {
        
    }
})

export default HomeComponent;
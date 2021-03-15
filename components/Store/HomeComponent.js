import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import SellerCardProduct from '../cards/Seller/SellerCardProduct'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const HomeComponent = ({ homeAds }) => {
    return (
        <View>
            {homeAds.map(ad => {
                switch(ad.adType){
                    case 0:
                        return <HomeAdType_0 key={Math.random()} ad={ad} />
                    case 1:
                        return <HomeAdType_1 key={Math.random()} ad={ad} />
                    case 2:
                        return <HomeAdType_2 key={Math.random()} ad={ad} />
                    default:
                         return null;
                }
            })}
        </View>
    )
}

const HomeAdType_0 = ({ad}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height))
    }, []);
    return (
        <View>
            <Image source={{uri: ad.image}} style={{width, aspectRatio}} />
        </View>
    )
}

const HomeAdType_1 = ({ad}) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/${ad.product}`)
        .then(res => res.json())
        .then(prdct => {setProduct(prdct)})
        .catch(err => console.log(err));
    }, []);
    return (
        <View>
            {product && <SellerCardProduct product={product} />}
        </View>
    )
}

const HomeAdType_2 = ({ad}) => {
    const navigation = useNavigation();
    const [aspectRatio, setAspectRatio] = useState(1);
    useEffect(() => {
        Image.getSize(ad.image, (width, height) => setAspectRatio(width/height))
    }, []);
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
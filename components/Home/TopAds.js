import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper/src';
import { Constants } from 'react-native-unimodules';
import { gStyles } from '../../global.style';

function TopAds(){
    const [ads, setAds] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAds(res)
        })
    }, []);
    if(!ads.length)
        return <View style={{height: 210, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={RFPercentage(4)} color={gStyles.color_0} /></View>
    return(
        <Swiper 
        style={styles.swiper}
        autoplay
        autoplayTimeout={5}
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
        showsPagination
        >
            {ads.map(ad => (
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() => ad.adType === 0 ? navigation.push('Product', {product: {_id: ad.store}}) : navigation.push('Store', {store: {_id: ad.store}})}
                    key={ad}
                >
                    <Image style={styles.swiperImage} source={{uri: ad.image}} />
                </TouchableOpacity>
            ))}
        </Swiper>
    )
}

const styles = StyleSheet.create({
    swiper: {
        height: 210,
    },
    swiperImage: {
        height: 210,
        width: '100%',
    },
    swiperDot: {
        backgroundColor:gStyles.background, 
        width: 10, 
        height: 10,
        borderRadius: 100,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    },
    swiperActiveDot: {
        backgroundColor:gStyles.color_0, 
        width: 10, 
        height: 10,
        borderRadius: 100,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    }
});

export default TopAds;
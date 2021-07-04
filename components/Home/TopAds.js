import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, ImageBackground, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper/src';
import { Constants } from 'react-native-unimodules';
import { gStyles } from '../../global.style';

function TopAds(){
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/home`)
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setAds(res)
        })
    }, []);
    if(loading)
        return <View style={{height: 210, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={RFPercentage(4)} color={'white'} /></View>
    return(
        <Swiper 
        style={styles.swiper}
        autoplay
        autoplayTimeout={4}
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
        showsPagination
        >
            {ads.length ? ads.map(ad => (
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() => ad.adType === 0 ? navigation.push('Product', {product: {_id: ad.product}}) : navigation.push('Store', {store: {_id: ad.store}})}
                    key={ad}
                >
                    <Image style={styles.swiperImage} source={{uri: ad.image}} />
                </TouchableOpacity>
            )) : <ImageBackground style={styles.swiperImageContainer} imageStyle={styles.swiperImage} source={{uri: "https://image.freepik.com/free-vector/red-oriental-chinese-seamless-pattern-illustration_193606-43.jpg"}}>
                    {/* <View style={styles.innerImage}>
                        <Text>Welcome to</Text>
                    </View> */}
                </ImageBackground>}
        </Swiper>
    )
}

const styles = StyleSheet.create({
    swiper: {
        height: 210,
        minHeight: 210
    },
    innerImage: {
        backgroundColor: gStyles.color_3,
        width: '80%',
        height: 130,
        borderColor: gStyles.color_0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderRadius: 15,
    },
    swiperImageContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
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
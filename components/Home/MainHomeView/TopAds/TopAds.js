import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';
import { gStyles } from '../../../../global.style';

function TopAds(){
    const ads = [
        'https://i.pinimg.com/originals/ca/73/52/ca73521c35fd5cd8759c87cd6273586a.png',
        'https://i.pinimg.com/originals/c4/2e/9c/c42e9c214d488352ac48fd8b48d0c39f.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxWEGWisD5ItW8iwnr9hdVTwAEEJe-AZXcw&usqp=CAU'
    ]
    return(
        <Swiper 
        style={styles.swiper}
        autoplay
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
        showsPagination
        >
            {ads.map(ad => (
                <View key={ad}>
                    <Image style={styles.swiperImage} source={{uri: ad}} />
                </View>
            ))}
        </Swiper>
    )
}

const styles = StyleSheet.create({
    swiper: {
        height: 210
    },
    swiperImage: {
        height: 210,
        width: '100%',
    },
    swiperDot: {
        backgroundColor:gStyles.background, 
        width: 14, 
        height: 3,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    },
    swiperActiveDot: {
        backgroundColor:gStyles.primary, 
        width: 14, 
        height: 3,
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 1,
    }
});

export default TopAds;
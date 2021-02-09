import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';
import { gStyles } from '../../global.style';

function TopAds(){
    const ads = [
        'https://img.freepik.com/free-vector/new-season-banner-template_1361-1221.jpg?size=626&ext=jpg',
        'https://cdn.dribbble.com/users/1779799/screenshots/6548351/lady.jpg?compress=1&resize=400x300',
        'https://i.pinimg.com/originals/73/a8/2e/73a82ecce46cb3f5a8f0ab7fb1b79e08.jpg',
        'https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg'
    ]
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
                <View key={ad}>
                    <Image style={styles.swiperImage} source={{uri: ad}} />
                </View>
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
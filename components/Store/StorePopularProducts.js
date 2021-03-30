import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

import SellerCardProduct from '../cards/Seller/SellerCardProduct'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import TextLato from '../utils/TextLato';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const HomeComponent = () => {
    const token = useSelector(state => state.authReducer.token);
    const [products, setProducts] = useState([]);
    const language = useLanguage();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/popular-products`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            const arr = res.sort((a, b) => b.quantity - a.quantity);
            setProducts(arr);
        })
    }, [])
    return (
        <View style={styles.container}>
            <TextLato bold style={styles.title}>Your Most Popular Products</TextLato>
            <TextLato italic style={styles.subtitle}>Based on the last 3 months</TextLato>
            {products.map(product => {
                return (
                <ImageBackground key={Math.random()} source={{uri: 'https://cdn.pixabay.com/photo/2014/03/22/17/03/the-background-292729_960_720.png'}} style={styles.bigContainer} imageStyle={{borderRadius: 10}}>
                    <Image source={{uri: product.images[0]}} style={styles.bigImage} />
                    <View style={{marginHorizontal: width * 0.05}}>
                        <TextLato bold style={{fontSize: RFPercentage(2.5), color: 'white', width: '70%'}}>{product.title[language]}</TextLato>
                        <TextLato italic style={{fontSize: RFPercentage(2), color: 'white', width: '70%', marginTop: height * 0.06}}>Quantity Sold: {product.quantity}</TextLato>
                    </View>
                </ImageBackground>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.05,
    },
    title: {
        fontSize: RFPercentage(2.5),
        marginHorizontal: width * 0.05,
    },
    subtitle: {
        fontSize: RFPercentage(1.5),
        marginHorizontal: width * 0.05,
    },
    bigContainer: {
        marginHorizontal: width * 0.05,
        marginTop: height * 0.02,
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.05,
        backgroundColor: gStyles.color_3,
        borderRadius: 10,
        flexDirection: 'row'
    },
    bigImage: {
        width: width * 0.3,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 10
    },
    prodContainer: {
        width: `${1/3 * 100}%`,
        // height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.01
    },
    innerContainer: {
        backgroundColor: 'red',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.02,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeComponent;
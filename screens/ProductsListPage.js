import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLanguage } from '../hooks/language';
import Swiper from 'react-native-swiper/src';
import { gStyles } from '../global.style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Reviews from '../components/utils/Reviews';
import TextLato from '../components/utils/TextLato';
import Icon from '../components/utils/Icon';
import ScrollCards from '../components/ScrollCards';
import StoreCard from '../components/cards/StoreCard';
import SimilarProductCard from '../components/cards/Product/SimilarProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../src/actions/cart';
import ProductReviewCard from '../components/cards/Product/ProductReviewCard';
import { useRef } from 'react';
import Toast from 'react-native-easy-toast';
import { SafeAreaView } from 'react-navigation';
import ProductsList from '../components/cards/Product/ProductsList';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const ProductsListPage = ({navigation, route}) => {
    const [products, setProducts] = useState([]);
    const criteria = route.params.criteria;
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/find`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({criteria})
        })
        .then(res => res.json())
        .then(res => {
            setProducts(res);
        })
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <Header details={{title: 'Products'}} />
            <TextLato bold style={{marginHorizontal: width * 0.05, marginVertical: height * 0.02}}>Search Results For: {criteria}</TextLato>
            <ProductsList products={products} />
        </SafeAreaView>

    )
}

export default ProductsListPage;
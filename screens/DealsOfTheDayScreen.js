import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-navigation';
import ProductsList from '../components/cards/Product/ProductsList';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';

const DealsOfTheDayScreen = () => {
    const [products, setProducts] = useState([]);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';

    const showToast = message => {
        toast.current.show(message);
    }

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/dealsoftheday/full`)
        .then(res => res.json())
        .then(res => {
            res = res.map(prod => prod.product);
            setProducts(res);
        })
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: en ? 'Deals of the Day' : 'عروض اليوم'}} />
            <ProductsList products={products} showToast={showToast} />
        </SafeAreaView>

    )
}

export default DealsOfTheDayScreen;
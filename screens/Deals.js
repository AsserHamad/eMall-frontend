import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-navigation';
import ProductsList from '../components/cards/Product/ProductsList';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';

const Deals = () => {
    const [products, setProducts] = useState([]);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';

    const showToast = message => {
        toast.current.show(message);
    }

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/deals`)
        .then(res => res.json())
        .then(res => {
            setProducts(res);
        })
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: en ? 'Deals' : 'العروض'}} />
            <ProductsList products={products} showToast={showToast} />
        </SafeAreaView>

    )
}

export default Deals
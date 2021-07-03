import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-navigation';
import ProductsList from '../components/cards/Product/ProductsList';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';
import HTTP from '../src/utils/axios';
import Loading from '../components/utils/Loading';

const Deals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';

    const showToast = message => {
        toast.current.show(message);
    }

    useEffect(() => {
        HTTP('/product/deals')
        .then(res => {
            setLoading(false);
            setProducts(res);
        })
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: en ? 'Deals' : 'العروض'}} />
            {loading ? <Loading /> : <ProductsList products={products} showToast={showToast} />}
        </SafeAreaView>

    )
}

export default Deals
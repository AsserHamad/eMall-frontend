import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StoreCard from '../cards/Seller/SellerCard';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';
import SellerCardProduct from '../cards/Seller/SellerCardProduct';
import { useLanguage } from '../../hooks/language';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ProductCardsList = ({url, body, refresh, showToast, method}) => {
    const token = useSelector(state => state.authReducer.token);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setProducts(res);
        })
    }, [refresh]);

    if(loading) return <View style={{width, height: height * 0.8, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.color_0} /></View>;
    return (
        <View style={{width, backgroundColor: 'white', paddingVertical: height * 0.03, alignItems: 'center'}}>
            {products.map(prod => <SellerCardProduct showToast={showToast} key={Math.random()} product={prod} style={{width: '95%', marginBottom: height * 0.03, transform: en ? [] : [{scaleX: -1}]}} />)}
        </View>)
    // return (
    //     <FlatList
    //         data={products}
    //         showsVerticalScrollIndicator={false}
    //         renderItem={({ item }) => <SellerCardProduct key={item._id*Math.random()} product={item} />}
    //         keyExtractor={() => `${Math.random()}`}
    //     />
    // )
}

export default ProductCardsList;

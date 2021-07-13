import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View, FlatList } from 'react-native';
import { gStyles } from '../../global.style';
import SellerCardProduct from '../cards/Seller/SellerCardProduct';
import { useLanguage } from '../../hooks/language';
import TextLato from './TextLato';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import HTTP from '../../src/utils/axios';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ProductCardsList = ({url, body, refresh, title}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    useEffect(() => {
        setLoading(true);
        HTTP.post(url, body)
        .then(res => {
            setLoading(false);
            setProducts(res);
        })
    }, [refresh]);

    if(loading) return <View style={{width, height: height * 0.8, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.color_0} /></View>;
    return (
        <View style={{alignItems: 'center'}}>
            <FlatList
                data={products}
                contentContainerStyle={{transform: en ? [] : [{scaleX: -1}]}}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <SellerCardProduct style={{width: width * 0.95}} product={item} />}
                keyExtractor={product => product._id}
            />
            <TouchableOpacity onPress={() => navigation.push('ViewAllProducts', {url: `${url}/full`, body, title: title})} style={{paddingVertical: height * 0.02, alignItems: 'center', borderRadius: 3, backgroundColor: gStyles.color_2, width: width * 0.95, marginBottom: height * 0.02}}>
               <TextLato bold style={{color: 'white'}}>{en ? 'View All Products' : 'عرض جميع المنتجات'}</TextLato>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCardsList;

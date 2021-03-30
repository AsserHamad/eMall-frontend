import React from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '../../../hooks/language';
import SellerCardProduct from '../Seller/SellerCardProduct';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height ]

const ProductsList = ({products, showToast}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <ScrollView contentContainerStyle={{paddingTop: height * 0.05,}} style={{transform: en ? [] : [{scaleX: -1}]}}>
            {products.map(product => <SellerCardProduct showToast={showToast} product={product} key={Math.random()} />)}
        </ScrollView>
    )
}

export default ProductsList;
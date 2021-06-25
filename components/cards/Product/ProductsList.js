import React from 'react';
import { Dimensions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useLanguage } from '../../../hooks/language';
import SellerCardProduct from '../Seller/SellerCardProduct';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height ]

const ProductsList = ({products, showToast}) => {
    const language = useLanguage();
    const en = language === 'en';
    return (
        <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            renderItem={(product) => <SellerCardProduct showToast={showToast} product={product.item} key={Math.random()} />}
            keyExtractor={() => `${Math.random()}`}
            style={{transform: en ? [] : [{scaleX: -1}]}}
            onEndReached={() => {console.log('EEENNNDD')}}
        />
        // <ScrollView contentContainerStyle={{paddingTop: height * 0.05,}} style={{transform: en ? [] : [{scaleX: -1}]}}>
        //     {products.map(product => <SellerCardProduct showToast={showToast} product={product} key={Math.random()} />)}
        // </ScrollView>
    )
}

export default ProductsList;
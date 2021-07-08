import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useLanguage } from '../../../hooks/language';
import SellerCardProduct from '../Seller/SellerCardProduct';
import Empty from '../../utils/Empty';

const ProductsList = ({products, showToast}) => {
    const language = useLanguage();
    const en = language === 'en';
    if(products.length === 0){
        return <Empty text={`There's nothing here`} height={'70%'}  />
    }
    return (
        <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            renderItem={(product) => <SellerCardProduct showToast={showToast} product={product.item} />}
            keyExtractor={product => product._id}
            style={{transform: en ? [] : [{scaleX: -1}]}}
        />
    )
}

export default ProductsList;
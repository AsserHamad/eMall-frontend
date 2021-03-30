import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Header from '../../../components/Header';
import ProductPicker from '../../../components/utils/ProductPicker';
import { useNavigation } from '@react-navigation/native';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const UpdateProductPick = () => {
    const [product, setProduct] = useState(undefined);
    const navigation = useNavigation();
    useEffect(() => {
        if(product)
        {
            navigation.push('UpdateProduct', product);
            setProduct(undefined);
        }
    }, [product])
    return (
        <View>
            <Header details={{title: 'Update Product'}} />
            <ProductPicker pickedProduct={product} setPickedProduct={setProduct} style={{minHeight: '90%', height: height * 0.1}} />
        </View>
    )
}

export default UpdateProductPick;
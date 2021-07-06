import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import Header from '../components/Header';
import TextLato from '../components/utils/TextLato';
import { SafeAreaView } from 'react-navigation';
import ProductsList from '../components/cards/Product/ProductsList';
import Toast from 'react-native-easy-toast';
import HTTP from '../src/utils/axios';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const ProductsListPage = ({route}) => {
    const [products, setProducts] = useState([]);
    const criteria = route.params.criteria;
    const toast = useRef();
    
    const showToast = message => {
        toast.current.show(message);
    }

    useEffect(() => {
        HTTP.post('/product/find', {criteria}).then(res => setProducts(res))
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: 'Products'}} />
            <TextLato bold style={{marginHorizontal: width * 0.05, marginVertical: height * 0.01}}>Search Results For: {criteria}</TextLato>
            <TextLato bold style={{marginHorizontal: width * 0.05, marginVertical: height * 0.01}}>{products.length} results</TextLato>
            <ProductsList showToast={showToast} products={products} />
        </SafeAreaView>

    )
}

export default ProductsListPage;
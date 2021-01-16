import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import TextLato from '../utils/TextLato';
import SellerCardProduct from '../cards/Seller/SellerCardProduct';

const BrowseComponent = ({id}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/store/${id}`)
        .then(res => res.json())
        .then(res => setProducts(res))
        .catch(err => console.log(err));
    }, [])
    if(!products.length)
        return <View><ActivityIndicator size={20} /></View>
    return (
        <ScrollView>
            {products.map(product => <SellerCardProduct key={Math.random()} product={product} />)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default BrowseComponent;
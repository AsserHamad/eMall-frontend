import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, Dimensions, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import SellerCardProduct from '../cards/Seller/SellerCardProduct';
import { gStyles } from '../../global.style';
import { RFPercentage } from 'react-native-responsive-fontsize';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const BrowseComponent = ({id, showToast, en}) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/store/${id}`)
        .then(res => res.json())
        .then(res => {console.log(res.map(p => p.images)); setProducts(res.slice(0, 32))})
        .catch(err => console.log(err));
    }, [])
    if(!products.length)
        return <View style={{width, height: height * 0.5, justifyContent: 'center'}}><ActivityIndicator size={RFPercentage(7)} color={gStyles.color_2} /></View>
    return (            
        <FlatList
            data={products}
            initialNumToRender = {10}
            onEndReachedThreshold = {0.1}
            showsVerticalScrollIndicator={false}
            renderItem={(product) => <SellerCardProduct showToast={showToast} product={product.item} key={Math.random()} />}
            keyExtractor={() => `${Math.random()}`}
            style={{transform: en ? [] : [{scaleX: -1}]}}
        />
        // <ScrollView style={{transform: en ? [] : [{scaleX: -1}]}}>
        //     {products.map(product => <SellerCardProduct showToast={showToast} key={Math.random()} product={product} map={Math.random()} />)}
        // </ScrollView>
        // <ProductsList products={products} />
    )
}

export default BrowseComponent;
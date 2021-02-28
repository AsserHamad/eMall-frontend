import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StoreCard from '../cards/Seller/SellerCard';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const SellerCardsList = ({url, body}) => {
    const token = useSelector(state => state.authReducer.token);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            console.log('result is', res)
            setLoading(false);
            setSellers(res.filter(store => store.products.length > 0));
        })
    }, []);

    if(loading) return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={height * 0.1} color={gStyles.color_0} /></View>;

    return (
        <FlatList
            data={sellers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <StoreCard key={item._id*Math.random()} seller={item} />}
            keyExtractor={() => `${Math.random()}`}
        />
    )
}

export default SellerCardsList;

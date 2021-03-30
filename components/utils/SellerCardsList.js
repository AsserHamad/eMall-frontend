import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StoreCard from '../cards/Seller/SellerCard';
import { gStyles } from '../../global.style';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const SellerCardsList = ({url, body, refresh, showToast}) => {
    const token = useSelector(state => state.authReducer.token);
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            setSellers(res.filter(store => store.products.length > 0));
            setLoading(false);
        })
    }, [refresh]);

    if(loading) return <View style={{justifyContent: 'center', alignItems: 'center', width, backgroundColor: 'white', paddingTop: height * 0.04}}>
        {[1,2,3].map(() => (
            <View key={Math.random()} style={{marginVertical: height * 0.01, height: height * 0.25, width: width * 0.9, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                <ActivityIndicator size={RFPercentage(5)} color={'white'} />
            </View>
        ))}
    </View>;

    return (<View style={{width, backgroundColor: 'white', alignItems: 'center', paddingTop: height * 0.04}}>
        {sellers.map(seller => <StoreCard key={Math.random()} showToast={showToast} key={Math.random()} seller={seller} />)}
    </View>)
    // return (
    //     <FlatList
    //         data={sellers}
    //         showsVerticalScrollIndicator={false}
    //         renderItem={({ item }) => <StoreCard key={item._id*Math.random()} seller={item} />}
    //         keyExtractor={() => `${Math.random()}`}
    //     />
    // )
}

export default SellerCardsList;

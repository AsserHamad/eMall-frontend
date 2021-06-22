import React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import SellerCard from '../cards/Seller/SellerCard';
import { useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextLato from './TextLato';
import { useNavigation } from '@react-navigation/native';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const SellerCardsList = ({url, body, refresh, showToast, title}) => {
    const token = useSelector(state => state.authReducer.token);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
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
        {sellers.map(seller => <SellerCard key={Math.random()} showToast={showToast} key={Math.random()} seller={seller} />)}
        <TouchableOpacity onPress={() => navigation.push('ViewAllStores', {url: `${url}/full`, body, title: title})} style={{paddingVertical: height * 0.02, alignItems: 'center', borderRadius: 10, backgroundColor: gStyles.color_2, width: width * 0.95, marginBottom: height * 0.02}}>
            <TextLato bold style={{color: 'white'}}>{en ? 'View All Stores' : 'عرض جميع المتاجر'}</TextLato>
        </TouchableOpacity>
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

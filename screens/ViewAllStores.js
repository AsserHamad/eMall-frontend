import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import { FlatList } from 'react-native-gesture-handler';
import { useLanguage } from '../hooks/language';
import { ActivityIndicator, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCard from '../components/cards/Seller/SellerCard';
import Empty from '../components/utils/Empty';

export default ({route}) => {
    const [sellers, setSellers] = useState([]);
    const [skip, setSkip] = useState(0);
    const [newStuff, setNewStuff] = useState(true);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const ref = useRef();

    const showToast = message => {
        toast.current.show(message);
    }

    const fetchSellers = () => {
        setLoading(true);
        fetch(route.params.url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...route.params.body, skip})
        })
        .then(res => res.json())
        .then(res => {
            const sellerStores = res.filter(seller => seller.products.length);
            setLoading(false);
            if(!res.length)
                return setNewStuff(false);
            setSkip(skip => skip + 10);
            setSellers(sellers => sellers.concat(sellerStores));
            setInitialLoad(false);
        })
    }

    useEffect(() => {
        fetchSellers();
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: route.params.title}} />
            {sellers.length > 0 ? (
                <>
                <FlatList
                    ref={ref}
                    data={sellers}
                    initialNumToRender = {10}
                    onEndReachedThreshold = {0.1}
                    onMomentumScrollBegin = {() => {ref.current.onEndReachedCalledDuringMomentum = false;}}
                    showsVerticalScrollIndicator={false}
                    renderItem={(seller) => <SellerCard key={Math.random()} showToast={showToast} key={Math.random()} seller={seller.item} />}
                    keyExtractor={() => `${Math.random()}`}
                    style={{transform: en ? [] : [{scaleX: -1}]}}
                    contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
                    onEndReached={() => {
                        if (!ref.current.onEndReachedCalledDuringMomentum && newStuff) {
                            fetchSellers();
                            ref.current.onEndReachedCalledDuringMomentum = true;
                        }
                    }}
                />
                {loading && (
                    <View style={{backgroundColor: 'black', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
                        <ActivityIndicator color={gStyles.color_2} size={RFPercentage(3)} />
                    </View>
                )}
                </>
            ) : (
                <Empty height={'70%'} />
            )}
        </SafeAreaView>

    )
}
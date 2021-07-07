import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useLanguage } from '../hooks/language';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCard from '../components/cards/Seller/SellerCard';
import Empty from '../components/utils/Empty';
import Loading from '../components/utils/Loading';
import HTTP from '../src/utils/axios';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

export default ({route}) => {
    const [sellers, setSellers] = useState([]);
    const [skip, setSkip] = useState(0);
    const [newStuff, setNewStuff] = useState(true);
    const [search, setSearch] = useState('');
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const ref = useRef();

    const showToast = message => {
        toast.current.show(message);
    }

    const renderItem = (seller) => <SellerCard showToast={showToast} seller={seller.item} />;

    const fetchSellers = () => {
        setLoading(true);
        HTTP.post(route.params.url, {...route.params.body, skip, search})
        .then(res => {
            const sellerStores = res.filter(seller => seller.products.length);
            setLoading(false);
            setInitialLoad(false);
            if(!res.length)
                return setNewStuff(false);
            setSkip(skip => skip + 10);
            setSellers(sellers => sellers.concat(sellerStores));
        })
    }

    useEffect(() => {
        setInitialLoad(true);
        fetchSellers();
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: route.params.title}} />
            <TextInput placeholder={en ? 'Search Stores...' : 'البحث عن المتاجر...'} style={{...styles.input, textAlign: en ? 'left' : 'right', fontFamily: 'Cairo'}} value={search} onChangeText={val => setSearch(val)} />
            
            {initialLoad ? <Loading /> : sellers.length > 0 ? (
                <>
                <FlatList
                    ref={ref}
                    data={sellers}
                    initialNumToRender = {10}
                    onEndReachedThreshold = {0.1}
                    removeClippedSubviews
                    onMomentumScrollBegin = {() => {ref.current.onEndReachedCalledDuringMomentum = false;}}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={store => store._id}
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

const styles = StyleSheet.create({
    input: {
        marginHorizontal: width * 0.03,
        marginVertical: height * 0.02,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.03,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '93%'
    },
})
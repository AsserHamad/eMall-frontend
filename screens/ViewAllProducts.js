import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../global.style';
import SellerCardProduct from '../components/cards/Seller/SellerCardProduct';
import { useLanguage } from '../hooks/language';
import { ActivityIndicator, Dimensions, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomModal from '../components/utils/CustomModal';
import TextLato from '../components/utils/TextLato';
import HTTP from '../src/utils/axios';
import Loading from '../components/utils/Loading';
import Empty from '../components/utils/Empty';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export default ({route}) => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState(0);
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);
    const [newStuff, setNewStuff] = useState(true);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const ref = useRef();
    const [modalVisible, setModalVisible] = useState(false);

    const showToast = message => {
        toast.current.show(message);
    }

    const fetchProducts = (concat) => {
        setLoading(true);
        HTTP.post(route.params.url, {...route.params.body, skip, search, sort})
        .then(res => {
            setLoading(false);
            setInitialLoading(false);
            if(!res.length && concat)
                return setNewStuff(false);
            setSkip(skip => skip + 20);
            setProducts(prods => {
                if(concat)
                    return prods.concat(res)
                return res;
            });
        })
    }

    useEffect(() => {
        fetchProducts(false);
    }, [search]);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <TextLato>Pick sorting method</TextLato>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => setSort(0)} activeOpacity={0.4} style={styles.sortButtons}>
                        <TextLato style={styles.sortButtonsText}>Release Order</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSort(1)} activeOpacity={0.4} style={styles.sortButtons}>
                        <TextLato style={styles.sortButtonsText}>Rating: Descending</TextLato>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSort(2)} activeOpacity={0.4} style={styles.sortButtons}>
                        <TextLato style={styles.sortButtonsText}>Rating: Ascending</TextLato>
                    </TouchableOpacity>
                </View>
            </CustomModal>
            <Header details={{title: route.params.title}} />
            {/* <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', justifyContent: 'center'}}> */}
                {/* <TouchableOpacity style={styles.sortButton} onPress={() => setModalVisible(true)}>
                    <Icon type={'FontAwesome'} name={'sort-amount-asc'} size={RFPercentage(2.5)} color={'white'} />
                </TouchableOpacity> */}
            <TextInput placeholder={en ? 'Search products...' : 'البحث عن المنتجات...'} style={{...styles.input, textAlign: en ? 'left' : 'right', fontFamily: 'Cairo'}} value={search} onChangeText={val => setSearch(val)} />
                {initialLoading ? <Loading /> : products.length > 0 ? (
                    <>            
                        <FlatList
                        ref={ref}
                        data={products}
                        initialNumToRender = {20}
                        onEndReachedThreshold = {0.1}
                        onMomentumScrollBegin = {() => {ref.current.onEndReachedCalledDuringMomentum = false;}}
                        showsVerticalScrollIndicator={false}
                        renderItem={(product) => <SellerCardProduct showToast={showToast} product={product.item} />}
                        keyExtractor={product => product._id}
                        style={{transform: en ? [] : [{scaleX: -1}]}}
                        onEndReached={() => {
                            if (!ref.current.onEndReachedCalledDuringMomentum && newStuff) {
                                fetchProducts(true);
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
                ) : <Empty height={'70%'} />}
            {/* </View> */}

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
    sortButton: {
        width: width * 0.1,
        aspectRatio: 1,
        backgroundColor: gStyles.color_1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sortButtons: {
        backgroundColor: gStyles.color_3,
        paddingVertical: height * 0.01,
        width: width * 0.7,
        alignItems: 'center',
        marginVertical: height * 0.01,
        borderRadius: 8,
        paddingHorizontal: width * 0.02
    },
    sortButtonsText: {
        color: 'white'
    }
})
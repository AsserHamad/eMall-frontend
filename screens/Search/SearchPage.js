import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import { gStyles } from '../../global.style';
import { FlatList } from 'react-native-gesture-handler';
import { useLanguage, useLanguageText } from '../../hooks/language';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SellerCard from '../../components/cards/Seller/SellerCard';
import SellerCardProduct from '../../components/cards/Seller/SellerCardProduct';
import TextLato from '../../components/utils/TextLato';
import CategoryListCard from '../../components/cards/CategoryList/CategoryListCard';
import SubcategoryListCard from '../../components/cards/SubcategoryListCard/SubcategoryListCard';
import HTTP from '../../src/utils/axios';
import Loading from '../../components/utils/Loading';
import Empty from '../../components/utils/Empty';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const SearchPage = ({route}) => {
    const path = route.params.path, criteria = route.params.criteria, type = route.params.type, skipRequest = route.params.skipRequest || 10;
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [newStuff, setNewStuff] = useState(true);
    const toast = useRef();
    const language = useLanguage();
    const en = language === 'en';
    const [loadingInitial, setLoadingInitial] = useState(true);
    const ref = useRef();
    const text = useLanguageText('search');
    const [loading, setLoading] = useState(true);

    const showToast = message => {
        toast.current.show(message);
    }

    const fetchData = () => {
        setLoading(true);
        HTTP.post(path, {criteria, skip})
        .then(res => {
            setLoading(false);
            setLoadingInitial(false);
            if(!res.length)
                return setNewStuff(false);
            setSkip(skip => skip + skipRequest);
            setData(data => data.concat(res));
        })
        .catch(err => console.log(err))
    }

    const store = (item) => <SellerCard showToast={showToast} seller={item} />;
    const product = (item) => <SellerCardProduct showToast={showToast} product={item} style={{width: width * 0.95}} />;
    const category = (item) => <CategoryListCard category={item} width={width * 0.95} />;
    const subcategory = (item) => <SubcategoryListCard subcategory={item} width={width * 0.95} />;

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: gStyles.background}}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{ title: `${text.title} ${text[type]}`}} />
            <TextLato bold style={{marginHorizontal: width * 0.05, marginBottom: height * 0.02}}>{text.searchingFor} {criteria}</TextLato>
            {loadingInitial ? (
                <Loading />
            ) : (
                data.length > 0 ? 
                <>
                    <FlatList
                    ref={ref}
                    data={data}
                    initialNumToRender = {30}
                    onEndReachedThreshold = {0.1}
                    onMomentumScrollBegin = {() => {ref.current.onEndReachedCalledDuringMomentum = false;}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => type === 'Store' ? store(item) :  type === 'Product' ? product(item) : type === 'Category' ? category(item) : subcategory(item)}
                    keyExtractor={item => item._id}
                    style={{transform: en ? [] : [{scaleX: -1}]}}
                    contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
                    onEndReached={() => {
                        if (!ref.current.onEndReachedCalledDuringMomentum && newStuff) {
                            fetchData();
                            ref.current.onEndReachedCalledDuringMomentum = true;
                        }
                    }}
                    />
                    {loading && (
                        <View style={{backgroundColor: 'black', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
                            <ActivityIndicator color={gStyles.color_2} size={RFPercentage(3)} />
                        </View>
                    )}
                </> : <>
                <Empty />
                </>
            )}
        </SafeAreaView>

    )
}

export default SearchPage;
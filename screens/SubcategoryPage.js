import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
import SellerCardsList from '../components/utils/SellerCardsList';
import Icon from '../components/utils/Icon';
import ProductCardsList from '../components/utils/ProductCardsList';
import Toast from 'react-native-easy-toast';

const SubcategoryPage = (props) => {
    const details = props.route.params;
    const [filter, setFilter] = useState('');
    const language = useLanguage();
    
    const toast = useRef();
    
    const showToast = message => {
        toast.current.show(message);
    }

    return (
        <View style={styles.container}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header details={{title: details.name[language]}} />
            <ScrollView>
                <FiltersScroll details={details} selected={filter} setSelected={setFilter} language={language} />
                <TextLato style={styles.title} bold>Stores</TextLato>
                <SellerCardsList showToast={showToast} show url={`${Constants.manifest.extra.apiUrl}/store/find-by-subcategory`} body={{subcategory: details, filter}} refresh={filter} />
                <TextLato style={{...styles.title, marginTop: height * 0.05}} bold>Products</TextLato>
                <ProductCardsList showToast={showToast} url={`${Constants.manifest.extra.apiUrl}/product/subcategory`} body={{id: details._id, filter}} refresh={filter} title={details.name[language]} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: gStyles.background,
        alignItems: 'center',
    },
    banner: {
        width
    },
    title: {
        marginHorizontal: width * 0.2,
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        marginTop: height * 0.02,
        fontSize: RFPercentage(3),
        textAlign: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    sortButton: {
        position: 'absolute',
        width: width * 0.2,
        height: width * 0.2,
        zIndex: 2,
        bottom: height * 0.03,
        right: width * 0.08,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});

export default SubcategoryPage;

const FiltersScroll = ({details, selected, setSelected, language}) => {
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/filters/${details._id}`)
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setFilters(res)
        })
    }, [])

    if(loading)
    return (
        <ScrollView 
            style={{...subcategoryStyles.scrollView, minHeight: height * 0.15, paddingVertical: height * 0.01, transform: en ? [] : [{scaleX: -1}]}}
            contentContainerStyle={{justifyContent: 'center'}}
            horizontal
        >
            {[1,2,3,4,5].map(num => (
                <View style={{...subcategoryStyles.container, backgroundColor: '#aaa'}} key={num}>
                    <ActivityIndicator color={'white'} size={RFPercentage(3)} />
                </View>
            ))}
        </ScrollView>
    )
    if(filters.length)
    return(
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={{...subcategoryStyles.scrollView, minHeight: height * 0.15, paddingVertical: height * 0.01, transform: en ? [] : [{scaleX: -1}]}} 
            contentContainerStyle={{justifyContent: 'center'}}
        >
            {filters.map(filter => (
                <TouchableOpacity
                    key={Math.random()}
                    style={{...subcategoryStyles.touchableBlock, transform: en ? [] : [{scaleX: -1}]}} 
                    activeOpacity={0.4} 
                    onPress={() => setSelected(filter._id)}>
                    <ImageBackground 
                        key={filter._id}
                        style={{...subcategoryStyles.container, opacity: selected === filter._id ? 1 : 0.5 }}
                        imageStyle={{borderRadius: 4, resizeMode: 'cover'}} source={{uri: filter.image}}/>
                    <TextLato style={{fontSize: RFPercentage(1.7), textAlign: 'center', marginTop: height * 0.01, width: width * 0.3, color: selected === filter._id ? 'red' : 'black' }}>{filter.name[language]}</TextLato>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
    else return null;
}

const subcategoryStyles = StyleSheet.create({
    touchableBlock: {
        alignItems: 'center'
    },
    container: {
        width: width * 0.3,
        aspectRatio: 16/9,
        // backgroundColor: gStyles.color_2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
    },
    scrollView: {
        width,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: height * 0.02
    }
})
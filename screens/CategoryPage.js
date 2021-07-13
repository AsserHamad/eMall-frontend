import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from '../components/Header';
import { gStyles } from '../global.style';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]
import Constants from 'expo-constants';
import { useLanguage } from '../hooks/language';
import TextLato from '../components/utils/TextLato';
import { useNavigation } from '@react-navigation/native';
import SellerCardsList from '../components/utils/SellerCardsList';
import ProductCardsList from '../components/utils/ProductCardsList';
import Toast from 'react-native-easy-toast';

const CategoryPage = (props) => {
    const details = props.route.params;
    const language = useLanguage();
    const en = language === 'en';
    const toast = useRef();

    const showToast = message => {
        toast.current.show(message);
    }

    return (
        <View style={styles.container}>
            <Toast ref={_toast => toast.current = _toast} />
            <Header search details={{title: details.name[language]}} />
            <ScrollView>
            <SubcategoriesScroll details={details} />
                <TextLato style={styles.title} bold>{en ? 'Stores' : 'البائعون'}</TextLato>
                <SellerCardsList showToast={showToast} show url={`/store/find-by-category`} body={{category: details._id}} title={details.name[language]} />
                <TextLato style={{...styles.title, marginTop: height * 0.05}} bold>{en ? 'Products' : 'المنتجات'}</TextLato>
                <ProductCardsList showToast={showToast} url={`/product/category`} body={{id: details._id}} title={details.name[language]} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gStyles.background
    },
    title: {
        marginHorizontal: width * 0.2,
        paddingVertical: height * 0.02,
        backgroundColor: 'white',
        marginTop: height * 0.02,
        fontSize: RFPercentage(3),
        textAlign: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    banner: {
        width,
        aspectRatio: 3.9
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
    },
    sortContainer: {
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.01,
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        borderRadius: 10,
        borderColor: '#aaa',
        borderWidth: 1
    },
    sortChoice: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#888',
        marginRight: width * 0.02
    }
});

export default CategoryPage;

const SubcategoriesScroll = ({details}) => {
    const navigation = useNavigation();
    const [subcategories, setSubcategories] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/subcategory/find-by-category/${details._id}`)
        .then(res => res.json())
        .then(res => setSubcategories(res))
    }, []);
    if(!subcategories.length)
        return (
            <View style={{flexDirection: 'row', width, minHeight: height * 0.15, justifyContent: 'center', paddingVertical: height * 0.01, marginTop: height * 0.01}}>
                {[1,2,3,4,5].map(num => (
                    <View key={num}>
                        <View style={{...subcategoryStyles.container, backgroundColor: '#aaa'}}>
                            <ActivityIndicator color={'white'} />
                        </View>
                        <TextLato bold style={{fontSize: RFPercentage(1.5), textAlign: 'center', color: 'black', marginTop: height * 0.01}}>...</TextLato>
                    </View>
                ))}
            </View>
        )
    return(
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            horizontal 
            style={{...subcategoryStyles.scrollView, transform: en ? [] : [{scaleX: -1}]}} 
            contentContainerStyle={{justifyContent: 'center', minHeight: height * 0.15, paddingVertical: height * 0.01}}
        >
            {subcategories.map(subcategory => (
                <TouchableOpacity key={subcategory._id} style={{...subcategoryStyles.touchableBlock, transform: en ? [] : [{scaleX: -1}]}} activeOpacity={0.8} onPress={() => navigation.push('Subcategory', {...subcategory})}>
                    <View key={subcategory._id} style={subcategoryStyles.container}>
                        <Image style={{width: width * 0.10, aspectRatio: 1}} source={{uri: subcategory.image}} />
                    </View>
                    <TextLato bold style={{fontSize: RFPercentage(1.5), textAlign: 'center', color: 'black', marginTop: height * 0.01, width: width * 0.18, textTransform: 'capitalize'}}>{subcategory.name[language]}</TextLato>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const subcategoryStyles = StyleSheet.create({
    touchableBlock: {
        alignItems: 'center'
        // paddingVertical: height * 0.05
    },
    container: {
        width: width * 0.2,
        aspectRatio: 1,
        backgroundColor: gStyles.color_2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 18,
    },
    scrollView: {
        width,
        marginTop: height * 0.01,
        paddingHorizontal: 3.5
    }
})
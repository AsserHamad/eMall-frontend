import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { useSelector } from 'react-redux';
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import TextLato from './TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const ProductPicker = ({style, pickedProduct, setPickedProduct}) => {
    const token = useSelector(state => state.authReducer.token);
    const [products, setProducts] = useState([]);
    const [pick, setPick] = useState(pickedProduct);
    const [loading, setLoading] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const [search, setSearch] = useState('');
    useEffect(() => {
        searchItems();
    }, [search]);

    const searchItems = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/store/own-products/${search}`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setLoading(false);
            setProducts(res)
        })
        .catch(err => console.log(err));
    }
    return (
        <View style={{...styles.container, ...style}}>
            <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', width: '100%'}} nestedScrollEnabled={true}>
                <TextInput placeholder={en ? 'Search products...' : 'البحث عن المنتجات...'} style={{...styles.input, textAlign: en ? 'left' : 'right', fontFamily: 'Cairo'}} value={search} onChangeText={val => setSearch(val)} />
                {loading ? 
                    <View style={styles.loadingContainer}><ActivityIndicator size={RFPercentage(5)} color={'white'} /></View>
                    :
                    products.map(product => {
                        console.log(product.images[0])
                        const picked = pick && product._id === pick._id;
                        return (
                        <TouchableOpacity key={product._id} activeOpacity={0.7} onPress={() => {setPick(product);setPickedProduct(product);}} style={{...styles.product, backgroundColor: picked ? gStyles.color_2 : 'white', flexDirection: en ? 'row' : 'row-reverse'}}>
                            <Image style={styles.image} source={{uri: product.images[0]}} />
                            <View style={{width: '50%'}}>
                                <TextLato style={{color: picked ? 'white' : 'black'}} bold>{product.title[language]}</TextLato>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: width * 0.05,
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
        width: '95%'
    },
    loadingContainer: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
        backgroundColor: 'white',
        paddingHorizontal: width * 0.03,
    },
    contentContainer: {
        borderRadius: 20,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.01,
    },
    product: {
        paddingVertical: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.005,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        width: '98%'
    },
    image: {
        width: width * 0.15,
        aspectRatio: 1,
        marginHorizontal: width * 0.04,
        resizeMode: 'contain'
    }
})

export default ProductPicker;
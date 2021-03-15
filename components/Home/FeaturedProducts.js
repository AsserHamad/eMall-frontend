import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { gStyles } from '../../global.style';
import { useLanguage } from '../../hooks/language';
import TextLato from '../utils/TextLato';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/featured-products`)
        .then(res => res.json())
        .then(res => setProducts([...res,...res,...res,...res,...res]))
    }, []);
    return (
        <View>
            <TextLato bold style={styles.title}>{en ? 'Featured Products' : 'منتجات مميزة'}</TextLato>
            <View style={styles.productsContainer}>
                {products.map(prod => {
                    const product = prod.product;
                    return (
                        <View key={Math.random()} style={styles.product}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: {_id: product._id}})} style={styles.innerProduct}>
                                <Image source={{uri: product.images[0]}} style={styles.productImage} />
                                <View style={{width: '100%', marginVertical: height * 0.02, paddingHorizontal: width * 0.03}}>
                                    <TextLato style={{textAlign: en ? 'left' : 'right'}} bold>{product.title[language]}</TextLato>
                                    <TextLato italic style={{textAlign: en ? 'left' : 'right', fontSize: RFPercentage(1.5)}}>{product.store.title}</TextLato>
                                    <TextLato style={{textAlign: en ? 'left' : 'right', marginTop: height * 0.04}}>{product.price} {en ? 'EGP' : 'ج.م'}</TextLato>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: RFPercentage(2.5),
        marginHorizontal: width * 0.03,
        marginVertical: width * 0.03,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    product: {
        width: '50%',
        paddingHorizontal: width * 0.01,
        paddingVertical: height * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerProduct: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3,
        borderRadius: 10
    },
    productImage: {
        width: '100%',
        aspectRatio: 1.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
})

export default FeaturedProducts;
import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import Header from '../../../components/Header';
import { useSelector } from 'react-redux';
import TextLato from '../../../components/utils/TextLato';
import { gStyles } from '../../../global.style';
import ProductPicker from '../../../components/utils/ProductPicker';
import useCredit from '../../../hooks/credit';
import { useLanguage, useLanguageText } from '../../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height]

const DealOfTheDayAd = () => {

    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(true);
    const credit = useCredit(refresh);
    const [refresh, setRefresh] = useState(false);
    const [products, setProducts] = useState([]);
    const [pickedProduct, setPickedProduct] = useState(null);
    const [discount, setDiscount] = useState("20");
    const [disabled, setDisabled] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const scroll = useRef();
    const text = useLanguageText('sellerDealsOfTheDay');
    
    const fetchProducts = () => {
        setLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/dealsoftheday/own`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setProducts(res);
            setLoading(false);
            setRefresh(refresh => !refresh);
        });
    }
    const addDeal = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/advertisement/dealsoftheday`, {
            method: 'post',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({product: pickedProduct._id, discount})
        })
        .then(res => res.json())
        .then(res => {
            setRefresh(refresh => !refresh);
            scroll.current.scrollTo({y:0, animated: true})
            fetchProducts();
        });

    }
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        setDisabled(!(pickedProduct !== null && Number(discount) >= 20 && Number(discount) < 100));
    }, [discount, pickedProduct]);

    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <ScrollView ref={scroll} contentContainerStyle={{paddingBottom: height * 0.05}} nestedScrollEnabled>
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.02, alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(2.5)}} bold>{text.active}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8)}} italic>{text.activeDescription}</TextLato>
                </View>
                {loading ? (
                    <View style={{height: height * 0.5, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={RFPercentage(5)} color={gStyles.color_0} /></View>
                    ) : products.length ? (
                    <View style={{marginTop: height * 0.03, marginHorizontal: width * 0.05}}>
                        {products.map(prod => {
                            const product = prod.product;
                            return (
                                <View style={[styles.productContainer, {flexDirection: en ? 'row' : 'row-reverse'}]} key={prod._id}>
                                    <Image source={{uri: product.images[0]}} style={styles.productImage} />
                                    <View>
                                        <TextLato bold>{product.title[language]}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.02}} >{text.status} {prod.active ? <TextLato bold style={{color: 'red'}}>{text.activeStatus}</TextLato> : <TextLato bold style={{color: '#aaa'}}>{text.inactive}</TextLato>}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8)}} >{text.clicks} {prod.orders.length}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8)}} >{text.purchases} {prod.clicks.length}</TextLato>
                                    </View>
                                </View>
                            )
                        })}
                        </View>
                    ) : (
                        <View style={{backgroundColor: gStyles.color_0, justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.07, marginTop: height * 0.02, marginHorizontal: width * 0.05, paddingHorizontal: width * 0.1}}>
                            <TextLato italic style={{color: 'white', textAlign: 'center'}}>{text.noDeals}</TextLato>
                        </View>
                )}
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.03}}>
                    <TextLato style={{fontSize: RFPercentage(2.5)}} bold>{text.add}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8)}} italic>{text.addDescription}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), color: 'red', marginTop: height * 0.01}} bold>{text.costs} 50 {text.egp}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), color: gStyles.color_1, marginBottom: height * 0.03}} italic>{text.storeCredit} {credit} EGP</TextLato>
                    <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} style={{height: height * 0.5}} />
                    {pickedProduct && (
                        <View style={{marginTop: height * 0.03}}>
                            <TextLato style={{fontSize: RFPercentage(2.5)}} bold>{text.discount}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginBottom: height * 0.02}} italic>{text.discountDescription}</TextLato>
                            <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center'}}>
                                <TextInput 
                                    keyboardType={'number-pad'}
                                    placeholder={'%'}
                                    value={discount}
                                    onChangeText={input => {
                                        Number.isNaN(Number(input)) || input >= 100 ? null : setDiscount(input)
                                    }}
                                    style={[styles.input, {textAlign: en ? 'left' : 'right'}]} />
                                <TextLato style={{fontSize: RFPercentage(3.3)}}>%</TextLato>
                            </View>
                            <TextLato style={{fontSize: RFPercentage(2.2), marginTop: height * 0.03}} italic>{text.productPrice}: {pickedProduct.price.toFixed(2)} {text.egp}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(2.2), marginTop: height * 0.01}} bold>{text.discountedPrice}: {(pickedProduct.price * (1 - Number(discount)/100)).toFixed(2)} {text.egp}</TextLato>
                        </View>
                    )}
                    {/* Purchase button */}
                    <TouchableOpacity onPress={addDeal} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_1}}>
                        <TextLato style={{color: 'white'}}>{text.addDeal}</TextLato>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderBottomWidth: 2,
        borderColor: gStyles.color_1,
        fontFamily: 'Cairo',
        width: width * 0.2,
        height: height * 0.05,
        paddingHorizontal: width * 0.02,
        fontSize: RFPercentage(3.3)
    },
    submitButton: {
        width: width * 0.9,
        paddingVertical: height * 0.01,
        marginTop: height * 0.03,
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImage: {
        width: width * 0.15,
        aspectRatio: 1,
        marginHorizontal: width * 0.02
    },
    productContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        marginVertical: height * 0.003,
        marginHorizontal: width * 0.01,
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.05,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default DealOfTheDayAd;
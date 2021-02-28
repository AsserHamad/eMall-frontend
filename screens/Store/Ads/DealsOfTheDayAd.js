import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Switch, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { SafeAreaView } from 'react-navigation';
import { useSelector } from 'react-redux';
import TextLato from '../../../components/utils/TextLato';
import { gStyles } from '../../../global.style';
import * as ImagePicker from 'expo-image-picker';
import ProductPicker from '../../../components/utils/ProductPicker';
import useCredit from '../../../hooks/credit';
import Icon from '../../../components/utils/Icon';
import { useLanguage } from '../../../hooks/language';

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
            console.log(res);
            setRefresh(refresh => !refresh);
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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.05}}>
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.02, alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(2.5)}} bold>Active Deals</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8)}} italic>These are the products you have deals for today</TextLato>
                </View>
                {loading ? (
                    <View style={{height: height * 0.5, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={RFPercentage(5)} color={gStyles.color_0} /></View>
                    ) : products.length ? (
                    <View style={{marginTop: height * 0.03, marginHorizontal: width * 0.05}}>
                        {products.map(prod => {
                            const product = prod.product;
                            return (
                                <View style={styles.productContainer} key={Math.random()}>
                                    <Image source={{uri: product.images[0]}} style={styles.productImage} />
                                    <View>
                                        <TextLato bold>{product.title[language]}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8), marginTop: height * 0.02}} >Status: {prod.active ? <TextLato bold style={{color: 'red'}}>Active</TextLato> : <TextLato bold style={{color: '#aaa'}}>Will Become Active Tomorrow</TextLato>}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8)}} >Clicks: {prod.orders.length}</TextLato>
                                        <TextLato style={{fontSize: RFPercentage(1.8)}} >Purchases: {prod.clicks.length}</TextLato>
                                    </View>
                                </View>
                            )
                        })}
                        </View>
                    ) : (
                        <View style={{backgroundColor: gStyles.color_0, justifyContent: 'center', alignItems: 'center', paddingVertical: height * 0.07, marginTop: height * 0.02, marginHorizontal: width * 0.05, paddingHorizontal: width * 0.1}}>
                            <TextLato italic style={{color: 'white', textAlign: 'center'}}>You do not currently have any deals on any products :(</TextLato>
                        </View>
                )}
                <View style={{marginHorizontal: width * 0.05, marginTop: height * 0.03}}>
                    <TextLato style={{fontSize: RFPercentage(2.5)}} bold>Add a Deal</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8)}} italic>Add one of your products to the Deals of the Day list</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), color: 'red', marginTop: height * 0.01}} bold>Costs 50 EGP</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), color: gStyles.color_1, marginBottom: height * 0.03}} italic>Current Store Credit: {credit} EGP</TextLato>
                    <ProductPicker pickedProduct={pickedProduct} setPickedProduct={setPickedProduct} />
                    {pickedProduct && (
                        <View style={{marginTop: height * 0.03}}>
                            <TextLato style={{fontSize: RFPercentage(2.5)}} bold>Percent Value</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.8), marginBottom: height * 0.02}} italic>*Must be between 20% and 100%</TextLato>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput 
                                    keyboardType={'number-pad'}
                                    placeholder={'%'}
                                    value={discount}
                                    onChangeText={input => {
                                        Number.isNaN(Number(input)) || input >= 100 ? null : setDiscount(input)
                                    }}
                                    style={styles.input} />
                                <TextLato style={{fontSize: RFPercentage(3.3)}}>%</TextLato>
                            </View>
                            <TextLato style={{fontSize: RFPercentage(2.2), marginTop: height * 0.03}} italic>Product Price: {pickedProduct.price.toFixed(2)} EGP</TextLato>
                            <TextLato style={{fontSize: RFPercentage(2.2), marginTop: height * 0.01}} bold>Discounted Price: {(pickedProduct.price * (1 - Number(discount)/100)).toFixed(2)} EGP</TextLato>
                        </View>
                    )}
                    {/* Purchase button */}
                    <TouchableOpacity onPress={addDeal} activeOpacity={0.8} style={{...styles.submitButton, backgroundColor: disabled ? gStyles.color_0 : gStyles.color_1}}>
                        <TextLato style={{color: 'white'}}>ADD DEAL</TextLato>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginRight: width * 0.04
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
        flexDirection: 'row'
    }
})

export default DealOfTheDayAd;
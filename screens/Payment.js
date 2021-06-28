import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';
import { useDispatch, useSelector } from 'react-redux';
import TextLato from '../components/utils/TextLato';
import Header from '../components/Header';
import { gStyles } from '../global.style';
import { useLanguage, useLanguageText } from '../hooks/language';
import { setCart } from '../src/actions/cart';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Payment = () => {
    const [cart, _setCart] = useState([]);
    const account = useSelector(state => state.authReducer.account);
    const address = account.addresses.length ? account.addresses.filter(address => address.active)[0] : undefined;
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const language = useLanguage();
    const en = language === 'en';
    const token = useSelector(state => state.authReducer.token);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const text = useLanguageText('payment');
    useEffect(() => {
            fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {headers: {token}})
            .then(res => res.json())
            .then(res => {
                _setCart(res.products)
            })
            fetch(`${Constants.manifest.extra.apiUrl}/client/total`, {
                headers: {token}
            })
            .then(res => res.json())
            .then(res => {
                setSubtotal(res.subtotal);
                setShipping(res.shipping);
                setTotal(res.total)
                setDisabled(false);
            })
    }, []);

    const order = () => {
        fetch(`${Constants.manifest.extra.apiUrl}/client/place-order`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            dispatch(setCart({products: []}));
            navigation.popToTop();
            navigation.push('Order', {code: res.code});
        })
    }
    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <View>
                <ScrollView showsVerticalScrollIndicator={false} style={{maxHeight: height * 0.65}}>
                <TextLato style={styles.deliveringTo}>{text.deliveringTo}</TextLato>
                {address ? (
                    <View style={styles.addressContainer}>
                        <TextLato bold style={{fontSize: RFPercentage(2.5)}}>{address.governate}, {address.city}</TextLato>
                        <TextLato style={styles.addressDetails}>{address.street}</TextLato>
                        <TextLato style={styles.addressDetails}>{text.building} {address.building}</TextLato>
                        <TextLato style={styles.addressDetails}>{text.apartment} {address.apartment}</TextLato>
                        <TextLato style={styles.addressDetails} italic>{address.extra}</TextLato>
                        <TextLato bold style={{fontSize: RFPercentage(2.5), marginTop: height * 0.05}}>{account.phone}</TextLato>
                        <TouchableOpacity onPress={() => navigation.push('Addresses')}>
                            <TextLato style={{color: gStyles.color_0, marginTop: height * 0.005}}>{text.changeAddress}</TextLato>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => navigation.push('Addresses')}>
                        <TextLato style={{color: gStyles.color_0, marginTop: height * 0.02}}>{text.addAddress}</TextLato>
                    </TouchableOpacity>
                )
                }
                <TextLato style={{marginTop: height * 0.03, fontSize: RFPercentage(1.7)}}>{text.review}</TextLato>
                <View style={styles.addressContainer}>
                    {cart.map(item => {
                        return (
                            <View key={Math.random()} style={{width: '100%', flexDirection: en ? 'row' : 'row-reverse', paddingVertical: 20, marginVertical: 5, borderBottomColor: '#eee', borderBottomWidth: 1}}>
                                <Image style={{width: '25%', aspectRatio: 1, borderRadius: 4, marginHorizontal: width * 0.03}} source={{uri: item.product.images[0]}} />
                            <View>
                                <TextLato bold>{item.product.title[language]}</TextLato>
                                {/* <TextLato style={{}}>{item.options.map(option => option.title[language]).toString()}</TextLato> */}
                                <TextLato>{text.quantity} {item.quantity}</TextLato>
                                {/* <TextLato>Price: {(item.options.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0) + item.product.price) * item.quantity}</TextLato> */}
                            </View>
                            </View>
                        )
                    })}
                </View>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.3}}>{text.subtotal}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center'}}>{subtotal.toFixed(2)} {text.egp}</TextLato>
                </View>
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.3}}>{text.shipping}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center'}}>{shipping.toFixed(2)} {text.egp}</TextLato>
                </View>
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.3}}>{text.total}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center', color: gStyles.color_0}}>{total.toFixed(2)} {text.egp}</TextLato>
                </View>
                <TouchableOpacity onPress={() => {
                    if(!disabled && address){
                        order()
                    }}}>
                    <View style={{...styles.buttonContainer, backgroundColor: disabled || !address ? '#777' : gStyles.color_0}}>
                        <TextLato bold style={{color: 'white', fontSize: RFPercentage(2), width: width * 0.4, textAlign: 'center'}}>{text.confirm}</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.05,
        flex: 1,
        alignItems: 'center',
        backgroundColor: gStyles.background
    },
    deliveringTo: {
        fontSize: RFPercentage(1.7)
    },
    addressContainer: {
        backgroundColor: 'white',
        width: width * 0.9,
        paddingHorizontal: width * 0.07,
        paddingVertical: height * 0.02,
        marginVertical: height * 0.015

    },
    addressDetails: {
        marginTop: height * 0.002
    },
    bottomContainer: {
        height: height * 0.2,
        padding: width * 0.03,
        paddingBottom: height * 0.03,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: 0
    },
    buttonContainer: {
        backgroundColor: gStyles.color_0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: height * 0.01,
        width: width * 0.8,
        marginTop: height * 0.02
    }
})

export default Payment;
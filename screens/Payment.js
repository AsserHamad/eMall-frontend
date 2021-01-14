import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage } from '../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const Payment = (props) => {
    const cart = useSelector(state => state.cartReducer.cart);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const language = useLanguage();
    useEffect(() => {
        if(cart.length){
                const st = cart.reduce((itemA, itemB) => {
                    const price = itemB.product.price;
                    const quantity = itemB.quantity;
                    const extraPrice = itemB.picks.reduce((itemA, itemB) => {
                        return itemA + itemB.extraPrice;
                    }, 0)
                    return itemA + (price + extraPrice) * quantity
                }
                ,0)
            setSubtotal(st);
            setShipping(st * 0.05);
            setTotal(st * 1.05)
            setDisabled(false);
        } else setDisabled(true);
    }, [cart])
    const address = {
        governate: 'Cairo',
        city: 'Maadi',
        street: 'Zahraa Al Maadi, Cairo Governate',
        building: 'A 82 - Section 12',
        floor: '1',
        apartment: '102',
        number: '01140008042'
    }
    return (
        <View style={styles.container}>
            <View>
                <TextLato style={styles.deliveringTo}>Delivering To</TextLato>
                <View style={styles.addressContainer}>
                    <TextLato bold style={{fontSize: RFPercentage(2.5)}}>{address.governate}, {address.city}</TextLato>
                    <TextLato style={styles.addressDetails}>{address.street}</TextLato>
                    <TextLato style={styles.addressDetails}>Floor Number: {address.floor}</TextLato>
                    <TextLato style={styles.addressDetails}>Apartment Number: {address.apartment}</TextLato>
                    <TextLato bold style={{fontSize: RFPercentage(2.5), marginTop: height * 0.05}}>{address.number}</TextLato>
                    <TextLato style={{color: gStyles.primary_light, marginTop: height * 0.005}}>Change Address</TextLato>
                </View>
                <TextLato style={{marginTop: height * 0.03, fontSize: RFPercentage(1.7)}}>Review</TextLato>
                <ScrollView style={styles.addressContainer}>
                    {cart.map(item => {
                        return (
                            <View style={{width: '100%', flexDirection: 'row', paddingVertical: 20, marginVertical: 5, borderBottomColor: '#eee', borderBottomWidth: 1}}>
                                <Image style={{width: '25%', aspectRatio: 1, borderRadius: 4, marginRight: width * 0.05}} source={{uri: item.product.images[0]}} />
                            <View>
                                <TextLato bold>{item.product.title[language]}</TextLato>
                                <TextLato style={{}}>{item.picks.map(option => option.title[language]).toString()}</TextLato>
                                <TextLato>Quantity: {item.quantity}</TextLato>
                                <TextLato>Price: {(item.picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0) + item.product.price) * item.quantity}</TextLato>
                            </View>
                            </View>
                        )
                    })}
                </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.2}}>Subtotal:</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center'}}>{subtotal.toFixed(2)} EGP</TextLato>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.2}}>Shipping:</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center'}}>{shipping.toFixed(2)} EGP</TextLato>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: height * 0.008}}>
                    <TextLato style={{fontSize: RFPercentage(1.8), width : width * 0.2}}>Total:</TextLato>
                    <TextLato style={{fontSize: RFPercentage(1.8), width: width * 0.4, textAlign: 'center', color: gStyles.primary_light}}>{total.toFixed(2)} EGP</TextLato>
                </View>
                <TouchableOpacity onPress={() => !disabled ? props.navigation.push('Payment') : null}>
                    <View style={{...styles.buttonContainer, backgroundColor: disabled ? '#777' : gStyles.primary_light}}>
                        <TextLato bold style={{color: 'white', fontSize: RFPercentage(2), width: width * 0.4, textAlign: 'center'}}>PAYMENT OPTIONS</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.05,
        flex: 1,
        paddingTop: height * 0.05,
        alignItems: 'center'
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
        height: height * 0.16,
        padding: width * 0.03,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: gStyles.primary_light,
        justifyContent: 'center',
        alignItems: 'center',
        padding: height * 0.01,
        width: width * 0.8,
        marginTop: height * 0.02
    }
})

export default Payment;
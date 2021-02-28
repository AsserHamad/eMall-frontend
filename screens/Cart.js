import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Constants } from 'react-native-unimodules';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { useSelector } from 'react-redux';
import CartCard from '../components/cards/CartCard';
import Icon from '../components/utils/Icon';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';

function Cart(){
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const navigation = useNavigation();
    const token = useSelector(state => state.authReducer.token);
    if(!loggedIn)
        return (
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <Image source={{uri: 'https://imgur.com/7GIUDPi.png'}} type="AntDesign" name="shoppingcart" color={gStyles.color_0} style={{marginBottom: height * 0.05, width: width * 0.9, aspectRatio: 692/553}} />
                <TextLato italic style={{marginBottom: height * 0.02, fontSize: RFPercentage(2.3)}}>It seems you're lost, log in to continue...</TextLato>
                <TouchableOpacity 
                    style={{backgroundColor: gStyles.color_0, padding: width * 0.03, alignItems: 'center'}}
                    onPress={() => {navigation.goBack();navigation.navigate('Register/Login')}}>
                    <TextLato style={{color: 'white'}}>Login to access your cart</TextLato>
                </TouchableOpacity>
            </View>
        )
    const products = useSelector(state => state.cartReducer.cart.products);
    const [subtotal, setSubtotal] = useState(0);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if(products.length){
            fetch(`${Constants.manifest.extra.apiUrl}/client/subtotal`, {
                headers: {token}
            })
            .then(res => res.json())
            .then(res => {
                setSubtotal(res.subtotal);
                setDisabled(false);
            })
        } else setDisabled(true);
    }, [products])
    if(products.length === 0)
            return (
                <View style={{justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                    <Image source={{uri: 'https://imgur.com/8hNOUA5.png'}} type="AntDesign" name="shoppingcart" color={gStyles.color_0} style={{marginBottom: height * 0.05, width: width * 0.9, aspectRatio: 692/553}} />
                    <TextLato italic style={{marginBottom: height * 0.02, fontSize: RFPercentage(2.3)}}>Still empty..</TextLato>
                </View>
            )
    return (
        <View style={styles.container}>
            <ScrollView>
                {products.map(item => {
                    return <CartCard key={Math.random()} item={item} />
                })}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(2), width : '20%'}}>Subtotal:</TextLato>
                    <TextLato style={{fontSize: RFPercentage(3.5)}}>{subtotal ? subtotal.toFixed(2) : '-'} EGP</TextLato>
                </View>
                <TouchableOpacity onPress={() => !disabled ? navigation.push('Payment') : null}>
                    <View style={{...styles.buttonContainer, backgroundColor: disabled ? '#777' : gStyles.color_0}}>
                        <TextLato bold style={{color: 'white', fontSize: RFPercentage(2.3)}}>CHECKOUT</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        backgroundColor: gStyles.background
    },
    bottomContainer: {
        width,
        height: height * 0.12,
        padding: width * 0.03,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: height * 0.01,
        backgroundColor: gStyles.color_0,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        padding: height * 0.01
    }
})

export default Cart;
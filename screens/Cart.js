import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { useSelector } from 'react-redux';
import CartCard from '../components/cards/CartCard';
import Header from '../components/Header';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';
import { useLanguage, useLanguageText } from '../hooks/language';
import HTTP from '../src/utils/axios';
import Loading from '../components/utils/Loading';



function Cart(){
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('cart');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    if(!loggedIn)
        return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: gStyles.background}}>
                <Header details={{title: text.title}} />
                <View style={{justifyContent: 'center', alignItems: 'center', height: height * 0.8}}>
                    <Image source={{uri: 'https://imgur.com/ZiYG51c.png'}} style={{marginBottom: height * 0.05, width: width * 0.9, aspectRatio: 692/553}} />
                    <TextLato italic style={{marginBottom: height * 0.02, fontSize: RFPercentage(2.3)}}>{text.nothing}</TextLato>
                    <TouchableOpacity 
                        style={{backgroundColor: gStyles.color_2, padding: width * 0.03, alignItems: 'center', borderRadius: 5}}
                        onPress={() => {navigation.goBack();navigation.navigate('Register/Login')}}>
                        <TextLato style={{color: 'white'}}>{text.login}</TextLato>
                    </TouchableOpacity>
                </View>
            </View>
        )
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        HTTP('/client/cart')
        .then(data => {
            setLoading(false);
            setProducts(data.products);
        })
        .catch(err => console.log(err));
        
        fetchSubtotal();
    }, [refresh]);

    const fetchSubtotal = () => {
        setSubtotal(null)
        HTTP('/client/subtotal')
        .then(data => {
            setSubtotal(data.subtotal);
            setDisabled(false);
        })
    }

    if(products.length === 0 && !loading)
            return (
                <View style={styles.container}>
                <Header details={{title: text.title}} />
                    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                        <Image source={{uri: 'https://imgur.com/Nkntljq.png'}} type="AntDesign" name="shoppingcart" color={gStyles.color_0} style={{marginBottom: height * 0.05, width: width * 0.9, aspectRatio: 692/553}} />
                        <TextLato italic style={{marginBottom: height * 0.02, fontSize: RFPercentage(2.3)}}>{text.empty}</TextLato>
                    </View>
                </View>
            )
    return (
        <View style={styles.container}>
            <Header details={{title: text.title}} />
            <ScrollView>
                {products.length === 0 ? <Loading  /> : products.map(item => {
                    return <CartCard setRefresh={setRefresh} key={item._id} item={item} />
                })}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(1.7), width : '30%'}}>{text.subtotal}</TextLato>
                    <TextLato style={{fontSize: RFPercentage(3.5)}}>{subtotal ? subtotal.toFixed(2) : '-'} {text.egp}</TextLato>
                </View>
                <TouchableOpacity onPress={() => !disabled ? navigation.push('Payment') : null}>
                    <View style={{...styles.buttonContainer, backgroundColor: disabled ? '#777' : gStyles.color_0}}>
                        <TextLato bold style={{color: 'white', fontSize: RFPercentage(2.3)}}>{text.checkout}</TextLato>
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
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.01,
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
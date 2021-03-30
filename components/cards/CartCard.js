import React from 'react';
import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';

import { connect, useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } from '../../src/actions/cart';
import Icon from '../utils/Icon';
import { useLanguage } from '../../hooks/language';
import TextLato from '../utils/TextLato';
import { Constants } from 'react-native-unimodules';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const image = 'https://www.pikpng.com/pngl/b/46-461447_deal-of-the-day-png-deal-day-clipart.png';

const bubbles = [
    'https://imgur.com/G27hm50.png',
    'https://imgur.com/Jd0bH1o.png',
    'https://imgur.com/FnOaCd8.png',
    'https://imgur.com/5AcEkKV.png',
];

const getColors = (discount) => {
    discount = Number(discount);
    if(discount < 40)
        return 0;
    if(discount < 60)
        return 1;
    if(discount < 80)
        return 2
    return 3;
}

function CartCard({item, setRefresh}){
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [quantityLoading, setQuantityLoading] = useState(false);
    const product = item.product;
    const [quantity, setQuantity] = useState(item.quantity);
    const language = useLanguage();
    const en = language === 'en';
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    const navigation = useNavigation();

    const increaseQuantity = () => {
        setQuantityLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item.product, options: item.options, quantity: quantity + 1})
        })
        .then(res => res.json())
        .then(res => {
            setQuantityLoading(false);
            setQuantity(quantity + 1);
            dispatch(setCart(res));
            setRefresh(refresh => !refresh);
        })
        .catch(err => console.log(err))
    }

    const decreaseQuantity = () => {
        if(quantity <= 1) 
            return;
        setQuantityLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item.product, options: item.options, quantity: quantity - 1})
        })
        .then(res => res.json())
        .then(res => {
            setQuantityLoading(false);
            setQuantity(quantity - 1);
            dispatch(setCart(res));
            setRefresh(refresh => !refresh);
        })
        .catch(err => console.log(err))
    }

    const removeFromCartHelper = () => {
        setDeleteLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item})
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setCart(res));
            setRefresh(refresh => !refresh);
        })
        .catch(err => console.log(err))
    }

    const calculatePricePreDiscount = () => {
        if(!product.price) return 0;

        let price = product.price;
        item.options.map(pickedOption => {
            const fullPick = product.options.filter(productOption => productOption._id.toString() === pickedOption.option.toString())[0];
            const pick = fullPick.options.filter(optionOption => optionOption._id.toString() === pickedOption.pick.toString())[0];
            price += (pick.extraPrice || 0);
        })
        return (price * item.quantity);
    }

    const calculatePrice = () =>  {
        if(!product.price) return 0;

        let price = product.price;
        let deal = product.dealOfTheDay;
        item.options.map(pickedOption => {
            const fullPick = product.options.filter(productOption => productOption._id.toString() === pickedOption.option.toString())[0];
            const pick = fullPick.options.filter(optionOption => optionOption._id.toString() === pickedOption.pick.toString())[0];
            price += (pick.extraPrice || 0);
        })
        return (price * item.quantity) * (deal ? (1-(deal.discount/100)) : 1)* (1 - (product.discount || 0));
    };

    if(!product)
        return <View style={{...styles.itemContainer, justifyContent: 'center'}}>
            <ActivityIndicator size={RFPercentage(4)} color={gStyles.color_0} />
        </View>
    return (
        <View style={{...styles.itemContainer, flexDirection: en ? 'row' : 'row-reverse'}}>

            {/* Deal of the Day */}
            {product.dealOfTheDay && <Image source={{uri: 'https://imgur.com/qIJjuUY.gif'}} style={{...styles.topImage, aspectRatio: 612/453}} />}

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={{uri: product.images[0]}} />
            </View>
            <View style={{alignItems: en ? 'flex-start' : 'flex-end'}}>
                
                {/* Title */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: {_id: product._id}})}>
                    <TextLato bold style={styles.itemTitle} >{product.title[language]}</TextLato>
                </TouchableOpacity>

                {/* Options */}
                {item.options.map(option => {
                    const x = item.product.options.filter(op => op._id === option.option)[0];
                    const pick = x.options.filter(op => op._id === option.pick)[0];
                    return (<TextLato key={Math.random()} italic style={{color: '#aaa'}}>{x.title[language]}: {pick.title[language]}</TextLato>)
                })}

                {/* Seller */}
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', marginTop: height * 0.01}}>
                    <TextLato style={{fontSize: RFPercentage(1.8)}}>{en ? 'Sold By' : 'البائع'}:</TextLato>
                    <TouchableOpacity onPress={() => {navigation.push('Store', {store: {_id: product.store._id}})}}>
                        <TextLato bold style={{paddingHorizontal: 5, color: gStyles.secondary, fontSize: RFPercentage(1.8)}}>{product.store.title}</TextLato>
                    </TouchableOpacity>
                </View>
                
                {/* Quantity */}
                <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center', height: 50}}>
                    <TextLato style={{fontSize: RFPercentage(1.8)}}>{en ? 'Quantity' : 'الكمية'}:</TextLato>
                    <TouchableOpacity onPress={() => decreaseQuantity()}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginHorizontal: 5}} size={15} name="minuscircle" />
                    </TouchableOpacity>
                    {quantityLoading ?
                        <ActivityIndicator color={gStyles.color_1} size={15} />
                    :
                        <TextLato style={{fontWeight: 'bold', color: gStyles.color_1, fontSize: 20}}>{quantity}</TextLato>
                    }
                    <TouchableOpacity onPress={() => increaseQuantity()}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginHorizontal: 5}} size={15} name="pluscircle" />
                    </TouchableOpacity>
                </View>

                {/* Text And Image */}
                {item.text && (
                    <View style={{marginVertical: height * 0.035}}>
                        <TextLato bold>{en ? 'Provided Text' : 'الكلام المضاف'}:</TextLato>
                        <TextLato>{item.text}</TextLato>
                    </View>
                )}
                
                {/* Text And Image */}
                {item.image && (
                    <View style={{marginVertical: height * 0.035}}>
                        <TextLato bold>{en ? 'Provided Image' : 'الصورة المضافة'}:</TextLato>
                        <TouchableOpacity onPress={() => navigation.push('Gallery', {images: [item.image]})}>
                            <View style={styles.downloadButton}>
                                <TextLato style={{color: 'white'}} bold>View Image</TextLato>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                
                {/* Price */}
                <View style={{marginTop: 10, flexDirection: en ? 'row' : 'row-reverse'}}>
                    {(product.discount || product.dealOfTheDay) ?
                    <View style={{width: '73%'}}>
                        {/* Discount thingy */}
                        <View style={{flexDirection: en ? 'row' : 'row-reverse', alignItems: 'center'}}>
                            <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(2), marginHorizontal: 10}}>{calculatePricePreDiscount().toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                            {product.discount && <View style={styles.discountContainer}>
                                <TextLato bold style={{color: 'white', fontSize: RFPercentage(1.6)}}>{product.discount * 100}%</TextLato>
                            </View>}
                            {product.dealOfTheDay && <View style={{...styles.discountContainer, backgroundColor: 'black'}}>
                                <TextLato bold style={{color: 'white', fontSize: RFPercentage(1.6)}}>{product.dealOfTheDay.discount}%</TextLato>
                            </View>}
                            <TextLato style={{color: gStyles.active, fontSize: RFPercentage(2)}} italic>{en ? 'OFF' : 'خصم'}</TextLato>
                        </View>

                        <TextLato bold style={{fontSize: RFPercentage(2), marginHorizontal: 10}}>{calculatePrice().toFixed(2)} {en ? 'EGP' : 'ج.م'}</TextLato>
                    </View> 
                    :
                    <TextLato bold style={{fontSize: RFPercentage(2), width: '73%'}}>{calculatePrice()} {en ? 'EGP' : 'ج.م'}</TextLato>
                    }

                    {/* Delete */}
                    <View style={{justifyContent: 'flex-end', height: height * 0.1}}>
                        <TouchableOpacity onPress={() => removeFromCartHelper(item)}>
                            {deleteLoading ? 
                            <ActivityIndicator size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.color_0} />
                            : <Icon type="AntDesign" name="delete" size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.color_0} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        minHeight: height * 0.18,
        shadowColor: 'black',
        shadowRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    topImage: {
        width: width * 0.25,
        zIndex: 3,
        position: 'absolute',
        left: 0,
        top: -height * 0.02
    },
    discountContainer: {
        paddingVertical: height * 0.008,
        paddingHorizontal: width * 0.015,
        backgroundColor: gStyles.active,
        borderRadius: 10,
        marginHorizontal: width * 0.01
    },
    innerDiscountBubble: {
        width: 60,
        borderRadius: 100,
        marginHorizontal: 'auto',
        transform: [{translateY: height * 0.01}, {translateX: -width * 0.025}],
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: width * 0.28
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 3
    },
    itemTitle: {
        fontSize: 15,
        maxWidth: width * 0.6
    },
    itemDetails: {
        flexDirection: 'column'
    },
    downloadButton: {
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        marginTop: height * 0.01,
        backgroundColor: '#1184e8',
        borderRadius: 15,
        alignItems: 'center'
    }
})

export default CartCard;
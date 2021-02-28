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

function CartCard({item}){
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [quantityLoading, setQuantityLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const language = useLanguage();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/product/${item.product}`)
        .then(res => res.json())
        .then(res => {setProduct(res);});
    }, []);

    const increaseQuantity = () => {
        setQuantityLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item.product, options: item.options, quantity: item.quantity + 1})
        })
        .then(res => res.json())
        .then(res => {
            setQuantityLoading(false);
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }

    const decreaseQuantity = () => {
        if(item.quantity <= 1) 
            return;
        setQuantityLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item.product, options: item.options, quantity: item.quantity - 1})
        })
        .then(res => res.json())
        .then(res => {
            setQuantityLoading(false);
            dispatch(setCart(res))
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
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
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
        <View style={styles.itemContainer}>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={{uri: product.images[0]}} />
            </View>
            <View style={styles.itemDetails}>
                
                {/* Title */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: {_id: product._id}})}>
                    <TextLato bold style={styles.itemTitle} >{product.title[language]}</TextLato>
                </TouchableOpacity>
                
                {/* Seller */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(1.8)}}>Sold By:</TextLato>
                    <TouchableOpacity onPress={() => {navigation.push('Store', {store: product.store})}}>
                        <TextLato style={{paddingLeft: 5, fontWeight: 'bold', color: gStyles.secondary, fontSize: RFPercentage(1.8)}}>{product.store.title}</TextLato>
                    </TouchableOpacity>
                </View>
                
                {/* Quantity */}
                <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                    <TextLato style={{fontSize: RFPercentage(1.8)}}>Quantity:</TextLato>
                    <TouchableOpacity onPress={() => decreaseQuantity()}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginLeft: 10, marginRight: 5}} size={15} name="minuscircle" />
                    </TouchableOpacity>
                    {quantityLoading ?
                        <ActivityIndicator color={gStyles.color_1} size={15} />
                    :
                        <TextLato style={{fontWeight: 'bold', color: gStyles.color_1, fontSize: 20}}>{item.quantity}</TextLato>
                    }
                    <TouchableOpacity onPress={() => increaseQuantity()}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginLeft: 5}} size={15} name="pluscircle" />
                    </TouchableOpacity>
                </View>

                {/* Deal of the Day */}
                {product.dealOfTheDay && 
                (
                    <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                    <Image source={{uri: image}} style={{...styles.topImage, aspectRatio: 820/481}} />
                    <ImageBackground source={{uri: bubbles[getColors(product.dealOfTheDay.discount)]}} style={{...styles.innerDiscountBubble, aspectRatio: 1}}>
                        <TextLato style={{fontSize: RFPercentage(2.5), textAlign: 'center', color: 'white'}}>{product.dealOfTheDay.discount}<TextLato style={{fontSize: RFPercentage(2)}}>%</TextLato></TextLato>
                    </ImageBackground>
                    </View>
                )
                }
                
                {/* Price */}
                <View style={{marginTop: 40, flexDirection: 'row'}}>
                    {product.discount ?
                    <View style={{width: '73%'}}>
                        {/* Discount thingy */}
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(2), marginRight: 10}}>{product.price * item.quantity} EGP</TextLato>
                            <View style={styles.discountContainer}>
                                <TextLato bold style={{color: 'white'}}>{product.discount * 100}%</TextLato>
                            </View>
                            <TextLato style={{color: gStyles.active, fontSize: RFPercentage(2.5)}} italic>OFF</TextLato>
                        </View>

                        <TextLato bold style={{fontSize: RFPercentage(2)}}>{calculatePrice().toFixed(2)} EGP</TextLato>
                    </View> 
                    :
                    <TextLato bold style={{fontSize: RFPercentage(2), width: '73%'}}>{calculatePrice()} EGP</TextLato>
                    }

                    {/* Delete */}
                    <View style={{justifyContent: 'flex-end'}}>
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
        height: height * 0.06,
        zIndex: 3
    },
    discountContainer: {
        paddingVertical: height * 0.008,
        paddingHorizontal: width * 0.015,
        backgroundColor: gStyles.active,
        borderRadius: 10,
        marginRight: width * 0.01
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
        height: 100
    },
    itemTitle: {
        fontSize: 15,
        maxWidth: 300
    },
    itemDetails: {
        flexDirection: 'column'
    }
})

export default CartCard;
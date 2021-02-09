import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
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

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function CartCard(props){
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [quantityLoading, setQuantityLoading] = useState(false);
    const item = props.item.product
    const language = useLanguage();
    const options = props.item.options ? props.item.options : []
    const quantity = props.item.quantity;
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    const navigation = useNavigation();

    const increaseQuantity = () => {
        setQuantityLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'put',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item, options, quantity: quantity + 1})
        })
        .then(res => res.json())
        .then(res => {
            console.log(`CART: Response from server for cart update is`, res);
            setQuantityLoading(false);
            dispatch(setCart(res))
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
            body: JSON.stringify({product: item, options, quantity: quantity - 1})
        })
        .then(res => res.json())
        .then(res => {
            setQuantityLoading(false);
            console.log(`CART: Response from server for cart update is`, res)
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }

    const removeFromCartHelper = () => {
        setDeleteLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: item._id})
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }
    const getOptions = () => {
        let picks = [];
        for (let i = 0; i < options.length; i++) {
            let option = item.options.filter(productOption => productOption._id === options[i].option)[0];
            let pick = option.options.filter(subOption => subOption._id === options[i].pick)[0];
            picks.push({option: option.title, pick: pick.title, extraPrice: pick.extraPrice ? pick.extraPrice : 0});
        }
        return picks;
    }

    const calculatePrice = () =>  (item.price + opts.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0)) * quantity;

    const opts = getOptions();
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={{uri: item.images[0]}} />
            </View>
            <View style={styles.itemDetails}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product: {_id: item._id}})}>
                    <TextLato bold style={styles.itemTitle} >{item.title[language]}</TextLato>
                </TouchableOpacity>
                <TextLato style={{color: '#888', marginVertical: 10}}>{opts.map(option => option.option[language])}: {opts.map(option => option.pick[language])}</TextLato>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Sold By:</Text>
                    <Text style={{paddingLeft: 5, fontWeight: 'bold', color: gStyles.secondary}}>{item.store.title}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: 50}}>
                    <Text>Quantity:</Text>
                    <TouchableOpacity onPress={() => decreaseQuantity(props.item)}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginLeft: 10, marginRight: 5}} size={15} name="minuscircle" />
                    </TouchableOpacity>
                    {quantityLoading ?
                        <ActivityIndicator color={gStyles.color_1} size={15} />
                    :
                        <Text style={{fontWeight: 'bold', color: gStyles.color_1, fontSize: 20}}>{quantity}</Text>
                    }
                    <TouchableOpacity onPress={() => increaseQuantity(props.item)}>
                        <Icon type="AntDesign" color={gStyles.color_0} style={{marginLeft: 5}} size={15} name="pluscircle" />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                    {item.discount ?
                    <View style={{width: '75%'}}>
                        <Text style={{textDecorationLine: 'line-through', fontSize: 14, marginRight: 10}}>{calculatePrice()} EGP</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{calculatePrice() * (1 - item.discount)} EGP</Text>
                    </View> 
                    :
                    <Text style={{fontSize: 20, fontWeight: 'bold', width: '70%'}}>{calculatePrice().toFixed(2)} EGP</Text>
                    }
                    <View>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
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
        display: 'flex',
        flexDirection: 'column'
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product)),
        increaseQuantity: (product) => dispatch(increaseQuantity(product)),
        decreaseQuantity: (product) => dispatch(decreaseQuantity(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../global.style';
import { AntDesign, MaterialCommunityIcons  } from '@expo/vector-icons';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function Cart({ route }){
    const [cart, setCart] = useState(
        // route.params.cart
        [{
        id: 0,
        shortName: 'Adidas Running Shoes X23',
        image: 'https://www.pngkit.com/png/full/3-31523_adidas-shoes-clipart-adidas-logo-adidas-shoes-png.png',
        price: 1000,
        discount: 0.4,
        quantity: 1,
        seller: {
            name: 'The Body Shop',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png'
        }}]);
    return (
        <ScrollView style={styles.container}>
            {cart.map(item => {
                return(
                    <View key={item.id} style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.itemImage} source={{uri: item.image}} />
                        </View>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle} >{item.shortName}</Text>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Seller:</Text>
                                <Text style={{paddingLeft: 5, fontWeight: 'bold', color: gStyles.secondary}}>{item.seller.name}</Text>
                                {/* <Image style={{width: 50, height: 20}} source={{uri: item.seller.logo}} /> */}
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Quantity:</Text>
                                <TouchableOpacity>
                                    <AntDesign color={gStyles.primary} style={{marginLeft: 10, marginRight: 5}} name="minuscircle" />
                                </TouchableOpacity>
                                <Text style={{fontWeight: 'bold', color: gStyles.secondary}}>{item.quantity}</Text>
                                <TouchableOpacity>
                                    <AntDesign color={gStyles.primary} style={{marginLeft: 5}} name="pluscircle" />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                                {item.discount ?
                                <View style={{width: '70%'}}>
                                    <Text style={{textDecorationLine: 'line-through', fontSize: 20, marginRight: 10}}>{item.price} EGP</Text>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.price * (1 - item.discount)} EGP</Text>
                                </View> 
                                :
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.price} EGP</Text>
                                }
                                <TouchableOpacity>
                                    <AntDesign name="delete" size={40} style={{}} color={gStyles.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    )
}

const lowerQuantity = (cart, item) => {
    let index = cart.indexOf(item);
    item.quantity = item.quantity - 1;
    cart[index] = item;
    return cart;
}

const increaseQuantity = (cart, item) => {
    // let index = cart.indexOf(item);
    // item.quantity = item.quantity + 1;
    // console.log(`index: ${index}, quantity: ${item.quantity}`)
    // cart[index] = item;
    return cart;
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1
    },
    itemContainer: {
        width,
        height: 160,
        shadowColor: 'black',
        shadowRadius: 10,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: width * 0.3
    },
    itemImage: {
        width: 90,
        height: 82
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Cart;
import { FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { gStyles } from '../../global.style';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../src/actions/cart';

function ProductCard(props){
    const product = props.product;
    return (
        <View style={styles.container}>
            {
                product.discount && 
                <Text style={styles.discountBubble}>{`${Math.floor(product.discount*100)}%`}</Text>
            }
            <Image style={styles.image} source={{uri: product.image}} />
            <View style={styles.seller}>
                <Image style={{width: product.seller.width, height: product.seller.height}} source={{uri: product.seller.logo}} />
            </View>
            <Text style={styles.name}>{product.shortName}</Text>
            {product.discount ? 
            <View style={styles.discountBlock}>
                <Text style={styles.originalPrice}>{product.price}</Text>
                <Text style={styles.discountedPrice}>{Math.ceil(product.price * (1 - product.discount))} EGP</Text>
            </View>
            :
            <Text style={styles.discountedPrice}>{product.price}</Text>
            }
            {!cartContainsItem(props.cart, props.product) ? 
                <TouchableNativeFeedback onPress={() => props.addToCart({product: props.product, quantity: 1})}>
                    <View style={{...styles.cartContainer, ...{backgroundColor: gStyles.primary}}}>
                        <FontAwesome5 color="white" size={20} name="cart-plus" />
                    </View>
                </TouchableNativeFeedback>
            :
                <TouchableNativeFeedback onPress={() => props.removeFromCart(props.product)}>
                    <View style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}}>
                        <MaterialCommunityIcons  color="white" size={23} name="cart-remove" />
                    </View>
                </TouchableNativeFeedback>
            }
        </View>
    )
}

const cartContainsItem = (cart, product) => {
    return cart.filter(prod => prod.product._id === product._id).length;
}

const styles = StyleSheet.create({
    discountBubble: {
        fontWeight: 'bold',
        backgroundColor: gStyles.primary,
        fontSize: 23,
        marginBottom: -20,
        color: 'white',
        borderRadius: 10,
        padding: 5,
        transform: [{translateX: 55}, {translateY: -15}],
        zIndex: 10
    },
    container: {
        backgroundColor: 'white',
        width: 150,
        height: 200,
        borderRadius: 5,
        // justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginRight: 7,
        marginLeft: 7,
        marginTop: 20,
        marginBottom: 30
    },
    image: {
        width: 100,
        height: 90
    },
    seller: {
        backgroundColor: gStyles.background,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        transform: [{translateX: -40}, {translateY: -25}],
        marginBottom: -25
    },
    sellerLogo: {
        width: 30,
        height: 20
    },
    name: {
        textAlign: 'center',
        height: 30
    },
    discountBlock: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        fontWeight: 'bold',
        color: gStyles.secondary,
        fontSize: 15,
        textAlign: 'right'
    },
    discountedPrice: {
        fontWeight: 'bold',
        color: gStyles.primary,
        marginLeft: 4,
        fontSize: 15
    },
    cartContainer: {
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        transform: [{translateY: 20}]
    },
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
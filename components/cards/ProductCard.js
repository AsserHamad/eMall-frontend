import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { gStyles } from '../../global.style';

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
                <Image style={styles.sellerLogo} source={{uri: product.seller.logo}} />
            </View>
            <Text style={styles.name}>{product.shortName}</Text>
            {product.discount ? 
            <View style={styles.discountBlock}>
                <Text style={styles.originalPrice}>{product.price}</Text>
                <Text style={styles.discountedPrice}>{product.price * (1 - product.discount)} EGP</Text>
            </View>
            :
            <Text style={styles.discountedPrice}>{product.price}</Text>
            }
            <TouchableNativeFeedback>
                <View style={styles.cartContainer}>
                    <FontAwesome5 color="white" size={20} name="cart-plus" />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
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
        transform: [{translateX: 42}, {translateY: -10}],
        zIndex: 10
    },
    container: {
        backgroundColor: 'white',
        width: 120,
        height: 200,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginRight: 7,
        marginLeft: 7,
        marginTop: 28,
        marginBottom: 28
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
        width: 35,
        height: 35
    },
    name: {
        textAlign: 'center'
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
        backgroundColor: gStyles.primary,
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        transform: [{translateY: 20}]
    },
})

export default ProductCard;
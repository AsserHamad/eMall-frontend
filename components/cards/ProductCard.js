import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { gStyles } from '../../global.style';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../src/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../src/actions/wishlist';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../utils/Icon';
import TextLato from '../utils/TextLato';

function ProductCard(props){
    const product = props.product;
    return (
        <View style={styles.container}>
            {
                product.discount && 
                <TextLato style={styles.discountBubble}>{`${Math.floor(product.discount*100)}%`}</TextLato>
            }
            <Image style={styles.image} source={{uri: product.image}} />
            <View style={styles.seller}>
                <Image style={{width: product.seller.width, height: product.seller.height}} source={{uri: product.seller.logo}} />
            </View>
            <TextLato style={styles.name}>{product.shortName}</TextLato>
            {product.discount ? 
            <View style={styles.discountBlock}>
                <TextLato style={styles.originalPrice}>{product.price}</TextLato>
                <TextLato style={styles.discountedPrice}>{Math.ceil(product.price * (1 - product.discount))} EGP</TextLato>
            </View>
            :
            <TextLato style={styles.discountedPrice}>{product.price}</TextLato>
            }
            <View style={styles.bottomButtonsContainer}>
                {/* Cart */}
                {!containsItem(props.cart, props.product) ? 
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.addToCart({product: props.product, quantity: 1})}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}}>
                            <Icon type="FontAwesome5" color="white" size={20} name="cart-plus" />
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromCart(props.product)}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}}>
                            <Icon type="MaterialIcons" color="white" size={23} name="remove-shopping-cart" />
                        </View>
                    </TouchableOpacity>
                }
                {/* Wishlist */}
                {!containsItem(props.wishlist, props.product) ? 
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.addToWishlist({product: props.product, quantity: 1})}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}}>
                            <Icon type="FontAwesome5" color="white" size={20} name="heart" />
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromWishlist(props.product)}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}}>
                            <Icon type="MaterialCommunityIcons" color="white" size={23} name="heart" />
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const containsItem = (arr, product) => {
    return arr.filter(prod => prod.product._id === product._id).length;
}

const styles = StyleSheet.create({
    discountBubble: {
        fontWeight: 'bold',
        backgroundColor: gStyles.color_1,
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
        color: gStyles.color_1,
        fontSize: 15,
        textAlign: 'right'
    },
    discountedPrice: {
        fontWeight: 'bold',
        color: gStyles.color_1,
        marginLeft: 4,
        fontSize: 15
    },
    bottomButtonsContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    cartContainer: {
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Dimensions.get('window').width * 0.01
        // marginTop: -20,
        // transform: [{translateY: 20}]
    },
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        wishlist: state.wishlistReducer.wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product)),
        addToWishlist: (product) => dispatch(addToWishlist(product)),
        removeFromWishlist: (product) => dispatch(removeFromWishlist(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
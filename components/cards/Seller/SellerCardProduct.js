import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, View } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect, useDispatch, useSelector } from 'react-redux';
import { gStyles } from '../../../global.style';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import TextLato from '../../utils/TextLato';
import Icon from '../../utils/Icon';
import { useLanguage } from '../../../hooks/language';
import { useNavigation } from '@react-navigation/native';
import { Constants } from 'react-native-unimodules';
import { setCart } from '../../../src/actions/cart';
import { setWishlist } from '../../../src/actions/wishlist';
import { useRef } from 'react';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];


const SellerCardProduct = ({product}) => {
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    const cartProducts = useSelector(state => state.cartReducer.cart.products);
    const wishlist = useSelector(state => state.wishlistReducer.wishlist.products);
    const token = useSelector(state => state.authReducer.token);
    const loggedIn = useSelector(state => state.authReducer.loggedIn);
    const dispatch = useDispatch();
    const toast = useRef();
    
    // ** Helper Functions
    
    const containsItem = (product) => {
        return cartProducts.filter(cartProduct => {
            return cartProduct.product._id === product._id
        }).length;
    }
    
    const containsItemWishlist = (product) => {
        return wishlist.filter(wishlistProduct => {
            return wishlistProduct._id === product._id
        }).length;
    }

    const [wishlistButton, setWishlistButton] = useState(!containsItemWishlist(product));
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [cartButton, setCartButton] = useState(!containsItem(product));
    const [cartLoading, setCartLoading] = useState(false);
    
    const addToCartHelper = (product) => {
        if(!loggedIn) return;
        const quantity = 1;
        const options = product.options.map(option =>{
            return {option: option._id, pick: option.options[0]._id}
        })
        setCartLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'post',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id, options, quantity})
        })
        .then(res => res.json())
        .then(res => {
            setCartLoading(false);
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }

    const removeFromCartHelper = (product) => {
        if(!loggedIn) return;
        setCartLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/cart`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product})
        })
        .then(res => res.json())
        .then(res => {
            setCartLoading(false);
            dispatch(setCart(res))
        })
        .catch(err => console.log(err))
    }

    const addToWishlistHelper = () => {
        if(!loggedIn) return;
        setWishlistLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/wishlist`, {
            method: 'post',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id})
        })
        .then(res => res.json())
        .then(res => {
            setWishlistLoading(false);
            dispatch(setWishlist(res))
        })
        .catch(err => console.log(err))
    }

    const removeFromWishlistHelper = () => {
        if(!loggedIn) return;
        setWishlistLoading(true);
        fetch(`${Constants.manifest.extra.apiUrl}/client/wishlist`, {
            method: 'delete',
            headers: {token, 'Content-Type': 'application/json'},
            body: JSON.stringify({product: product._id})
        })
        .then(res => res.json())
        .then(res => {
            setWishlistLoading(false);
            dispatch(setWishlist(res))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        setCartButton(!containsItem(product));
        setWishlistButton(!containsItemWishlist(product));
    }, [cartProducts, wishlist])

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('Product', {product: product})}>
            <View style={[styles.container, {flexDirection: en ? 'row' : 'row-reverse', transform: en ? [] : [{scaleX: -1}]}]}>
                <View>
                    {product.discount && <TextLato style={styles.discountContainer}>{Math.floor(product.discount * 100)}% {en ? 'OFF' : 'خصم'}</TextLato>}
                    <Image style={styles.image} source={{uri: product.images[0]}} />
                </View>

                {/* Details */}
                <View style={styles.details}>
                    <TextLato bold style={styles.title}>{product.title[language]}</TextLato>
                    <TextLato style={styles.description}>{product.description[language].substr(0, 100)}...</TextLato>
                    {product.discount ? 
                        <View key={Math.random()} style={{marginTop: height * 0.02}}>
                            <TextLato style={{fontSize: RFPercentage(1.7), textDecorationLine: 'line-through', color: gStyles.color_0}}>{product.price} {en ? 'EGP' : 'ج.م'}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7), marginLeft: RFPercentage(0.7), color: gStyles.color_0}}>{Math.floor(product.price * (1-product.discount))} {en ? 'EGP' : 'ج.م'}</TextLato>
                        </View>
                        :
                        <TextLato style={{fontSize: RFPercentage(1.7), color: gStyles.color_0, marginTop: height * 0.02}}>{product.price} {en ? 'EGP' : 'ج.م'}</TextLato>
                    }
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    {/* Cart */}
                    {cartLoading ? 
                        <View >
                            <ActivityIndicator color={'white'} style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} size={20} />
                        </View>
                    :
                    cartButton ?
                        <TouchableOpacity activeOpacity={0.4} onPress={() => addToCartHelper(product)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} type="FontAwesome5" color="white" size={20} name="cart-plus" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => removeFromCartHelper(product._id)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialIcons" color="white" size={23} name="remove-shopping-cart" />
                        </TouchableOpacity>
                    }
                    {/* Wishlist */}
                    {wishlistLoading ? 
                        <View >
                            <ActivityIndicator color={'white'} style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} size={20} />
                        </View>
                    :
                    wishlistButton ? 
                        <TouchableOpacity activeOpacity={0.4} onPress={() => addToWishlistHelper({product: product, quantity: 1})}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.color_1}}} type="FontAwesome5" color="white" size={20} name="heart" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => removeFromWishlistHelper(product)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialCommunityIcons" color="white" size={23} name="heart" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: width * 0.6,
        marginVertical: 10,
        marginHorizontal: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3,
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 2,
        backgroundColor: 'white',
        padding: RFPercentage(1.5)
    },
    image: {
        width: width * 0.23,
        aspectRatio: 1
    },
    details: {
        width: width * 0.4,
        marginHorizontal: width * 0.03
    },
    title: {
        fontSize: RFPercentage(1.7),
    },
    description: {
        fontSize: RFPercentage(1.1),
        marginTop: height * 0.005
    },
    buttons: {
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountContainer: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gStyles.color_0,
        color: 'white',
        fontSize: RFPercentage(1.5),
    },
    cartContainer: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: 100,
        backgroundColor: gStyles.color_0,
        marginVertical: RFPercentage(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerCardProduct);
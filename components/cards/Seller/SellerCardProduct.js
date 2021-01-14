import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../src/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../src/actions/wishlist';
import { gStyles } from '../../../global.style';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import TextLato from '../../utils/TextLato';
import Icon from '../../utils/Icon';
import { useLanguage } from '../../../hooks/language';
import { useNavigation } from '@react-navigation/native';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const SellerCardProduct = (props) => {
    const language = useLanguage();
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('Product', {product: props.product})}>
            <View style={styles.container}>
                <View>
                    {props.product.discount && <TextLato style={styles.discountContainer}>{Math.floor(props.product.discount * 100)}% Off</TextLato>}
                    <Image style={styles.image} source={{uri: props.product.images[0]}} />
                </View>

                {/* Details */}
                <View style={styles.details}>
                    <TextLato bold style={styles.title}>{props.product.title[language]}</TextLato>
                    <TextLato style={styles.description}>{props.product.description[language].substr(0, 100)}...</TextLato>
                    {props.product.discount ? 
                        <View key={Math.random()} style={{display: 'flex', flexDirection: 'row', marginTop: height * 0.02}}>
                            <TextLato style={{fontSize: RFPercentage(1.7), textDecorationLine: 'line-through', color: gStyles.primary_light}}>{props.product.price}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7), marginLeft: RFPercentage(0.7), color: gStyles.primary_light}}>{Math.floor(props.product.price * (1-props.product.discount))} EGP</TextLato>
                        </View>
                        :
                        <TextLato style={{fontSize: RFPercentage(1.7), color: gStyles.primary_light, marginTop: height * 0.02}}>{props.product.price} EGP</TextLato>
                    }
                </View>

                {/* Buttons */}
                <View style={styles.buttons}>
                    {/* Cart */}
                    {!containsItem(props.cart, props.product) ? 
                        <TouchableOpacity activeOpacity={0.4} onPress={() => props.addToCart({product: props.product, quantity: 1})}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.primary_medium}}} type="FontAwesome5" color="white" size={20} name="cart-plus" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromCart(props.product)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialIcons" color="white" size={23} name="remove-shopping-cart" />
                        </TouchableOpacity>
                    }
                    {/* Wishlist */}
                    {!containsItem(props.wishlist, props.product) ? 
                        <TouchableOpacity activeOpacity={0.4} onPress={() => props.addToWishlist({product: props.product, quantity: 1})}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: gStyles.primary_medium}}} type="FontAwesome5" color="white" size={20} name="heart" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromWishlist(props.product)}>
                            <Icon style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}} type="MaterialCommunityIcons" color="white" size={23} name="heart" />
                        </TouchableOpacity>
                    }
                </View>
            </View>  
        </TouchableOpacity>
    )
}

const containsItem = (arr, product) => {
    return arr.filter(prod => prod.product._id === product._id).length;
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
        fontSize: RFPercentage(1.3),
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
        backgroundColor: gStyles.primary_light,
        color: 'white',
        fontSize: RFPercentage(1.5),
    },
    cartContainer: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: 100,
        backgroundColor: gStyles.primary,
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
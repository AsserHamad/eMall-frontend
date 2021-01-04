import { useFonts } from 'expo-font';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../src/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../src/actions/wishlist';
import { gStyles } from '../../../global.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextLato from '../../utils/TextLato';
const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

const SellerCardProduct = (props) => {

    return (
        <View style={styles.container}>
            <View>
                {props.product.discount && <Text style={styles.discountContainer}>{Math.floor(props.product.discount * 100)}% Off</Text>}
                <Image style={styles.image} source={{uri: props.product.image}} />
            </View>

            {/* Details */}
            <View style={styles.details}>
                <TextLato bold style={styles.title}>{props.product.shortName}</TextLato>
                <TextLato style={styles.description}>{props.product.description.en.substr(0, 100)}...</TextLato>
                {props.product.discount ? 
                    <View key={props.product._id} style={{display: 'flex', flexDirection: 'row', marginTop: height * 0.02}}>
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
                        <View style={{...styles.cartContainer, ...{backgroundColor: gStyles.primary_medium}}}>
                            <FontAwesome5 color="white" size={20} name="cart-plus" />
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromCart(props.product)}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}}>
                            <MaterialCommunityIcons  color="white" size={23} name="cart-remove" />
                        </View>
                    </TouchableOpacity>
                }
                {/* Wishlist */}
                {!containsItem(props.wishlist, props.product) ? 
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.addToWishlist({product: props.product, quantity: 1})}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: gStyles.primary_medium}}}>
                            <FontAwesome5 color="white" size={20} name="heart" />
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity activeOpacity={0.4} onPress={() => props.removeFromWishlist(props.product)}>
                        <View style={{...styles.cartContainer, ...{backgroundColor: '#20B2AA'}}}>
                            <MaterialCommunityIcons color="white" size={23} name="heart" />
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
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: width * 0.6,
        marginVertical: 10,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
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
        fontFamily: 'Lato',
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
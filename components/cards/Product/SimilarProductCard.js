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

const SimilarProductCard = (props) => {
    const language = useLanguage();
    const en = language === 'en';
    const product = props.product;
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.push('Product', {product})}>
            <View style={{...styles.container, transform: en ? [] : [{scaleX: -1}]}}>
                <View>
                    {product.discount && <Text style={styles.discountContainer}>{Math.floor(product.discount * 100)}% Off</Text>}
                    <Image style={styles.image} source={{uri: product.images[0]}} />
                </View>

                {/* Details */}
                <View style={styles.details}>
                    <TextLato bold style={styles.title}>{product.title[language]}</TextLato>
                    <TextLato style={styles.description}>{product.description[language].substr(0, 50)}...</TextLato>
                    {product.discount ? 
                        <View key={Math.random()} style={{flexDirection: 'row', marginTop: height * 0.02}}>
                            <TextLato style={{fontSize: RFPercentage(1.7), textDecorationLine: 'line-through', color: gStyles.color_0}}>{product.price}</TextLato>
                            <TextLato style={{fontSize: RFPercentage(1.7), marginLeft: RFPercentage(0.7), color: gStyles.color_0}}>{Math.floor(product.price * (1-product.discount))} EGP</TextLato>
                        </View>
                        :
                        <TextLato style={{fontSize: RFPercentage(1.7), color: gStyles.color_0, marginTop: height * 0.02}}>{product.price} EGP</TextLato>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        height: height * 0.2,
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
        width: width * 0.3,
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
        backgroundColor: gStyles.color_0,
        color: 'white',
        fontFamily: 'Lato',
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

export default connect(mapStateToProps, mapDispatchToProps)(SimilarProductCard);
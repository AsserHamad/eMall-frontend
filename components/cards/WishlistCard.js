import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import { AntDesign } from '@expo/vector-icons';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { connect } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../src/actions/wishlist';
import Icon from '../utils/Icon';
import { useLanguage, useLanguageText } from '../../hooks/language';
import TextLato from '../utils/TextLato';
import { addToCart, removeFromCart } from '../../src/actions/cart';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

function WishlistCard(props){
    const item = props.item;
    const text = useLanguageText('wishlist');
    const language = useLanguage();
    const en = language === 'en';
    const navigation = useNavigation();
    return (
        <View style={{...styles.itemContainer, flexDirection: en ? 'row' : 'row-reverse'}}>
            <Image style={styles.itemImage} source={{uri: item.images[0]}} />
            <View style={styles.itemDetails}>
                <TouchableOpacity onPress={() => navigation.push('Product', {product: {_id: item._id}})}>
                    <TextLato bold style={styles.itemTitle} >{item.title[language]}</TextLato>
                </TouchableOpacity>
                <View style={{flexDirection: en ? 'row' : 'row-reverse'}}>
                        <TextLato style={{fontSize: RFPercentage(1.5)}}>{text.seller}</TextLato>
                    <TextLato bold style={{marginHorizontal: 5, color: gStyles.secondary, fontSize: RFPercentage(1.5)}}>{item.store && item.store.title}</TextLato>
                    {/* <Image style={{width: 50, height: 20}} source={{uri: item.seller.logo}} /> */}
                </View>
                <View style={{marginTop: 40, flexDirection: en ? 'row' : 'row-reverse'}}>
                    {item.discount ?
                    <View style={{width: '50%'}}>
                        <TextLato style={{textDecorationLine: 'line-through', fontSize: RFPercentage(2)}}>{item.price} {en ? 'EGP' : 'ج.م.'}</TextLato>
                        <TextLato bold style={{fontSize: RFPercentage(2)}}>{item.price * (1 - item.discount)} {en ? 'EGP' : 'ج.م.'}</TextLato>
                    </View> 
                    :
                    <TextLato bold style={{fontSize: RFPercentage(2), width: '50%'}}>{item.price} {en ? 'EGP' : 'ج.م.'}</TextLato>
                    }
                    <View style={{...styles.buttonsContainer, alignItems: en ? 'flex-end' : 'flex-start'}}>
                        {/* Add to Cart */}
                            {/* <TouchableOpacity onPress={() => props.addToCart(props.item)}>
                                <Icon type="AntDesign" name="shoppingcart" size={24} style={styles.button} color={'white'} />
                            </TouchableOpacity> */}
                        
                        {/* Delete Item */}
                        <TouchableOpacity onPress={() => setShowAlert(true)}>
                            <AntDesign name="delete" size={RFPercentage(3)} style={styles.button} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    itemContainer: {
        width: '90%',
        marginVertical: height * 0.01,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    itemImage: {
        width: width * 0.2,
        aspectRatio: 1,
        marginHorizontal: width * 0.02
    },
    itemTitle: {
        fontSize: RFPercentage(2),
        // maxWidth: width * 0.55
    },
    itemDetails: {
        width: width * 0.6
    },
    buttonsContainer: {
        width: '40%',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: width * 0.1,
        backgroundColor: gStyles.color_0,
        padding: RFPercentage(1),
        borderRadius: 10,
        marginHorizontal: RFPercentage(0.5)
    }
})

const containsItem = (arr, product) => {
    return arr.filter(prod => prod._id === product._id).length;
}

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlistReducer.wishlist,
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToWishlist: (product) => dispatch(addToWishlist(product)),
        removeFromWishlist: (product) => dispatch(removeFromWishlist(product)),
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistCard);
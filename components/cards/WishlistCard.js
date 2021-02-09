import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
import { connect } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../src/actions/wishlist';
import { addToCart, removeFromCart } from '../../src/actions/cart';
import { RFPercentage } from 'react-native-responsive-fontsize';

function WishlistCard(props){
    const item = props.item;
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={{uri: item.images[0]}} />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} >{item.title.en}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Seller:</Text>
                    <Text style={{paddingLeft: 5, fontWeight: 'bold', color: gStyles.secondary}}>{item.store && item.store.title}</Text>
                    {/* <Image style={{width: 50, height: 20}} source={{uri: item.seller.logo}} /> */}
                </View>
                <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                    {item.discount ?
                    <View style={{width: '50%'}}>
                        <Text style={{textDecorationLine: 'line-through', fontSize: 14, marginRight: 10}}>{item.price} EGP</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.price * (1 - item.discount)} EGP</Text>
                    </View> 
                    :
                    <Text style={{fontSize: RFPercentage(2.5), fontWeight: 'bold', width: '65%'}}>{item.price} EGP</Text>
                    }
                    <View style={styles.buttonsContainer}>
                        {/* Add to Cart */}
                        {/* {!containsItem(wishlist, item) ? 
                            <TouchableOpacity onPress={() => props.addToCart(props.item)}>
                                <Icon type="AntDesign" name="shoppingcart" size={24} style={styles.button} color={'white'} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => props.removeFromCart(props.item.product)}>
                                <Icon type="MaterialIcons" name="remove-shopping-cart" size={24} style={{...styles.button, backgroundColor: gStyles.background }} color={'red'} />
                            </TouchableOpacity>
                        } */}
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
        marginVertical: width * 0.02,
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
        width: width * 0.2,
        height: width * 0.2
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: RFPercentage(1.6),
        maxWidth: width * 0.55
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: width * 0.1,
        backgroundColor: gStyles.color_0,
        padding: RFPercentage(1),
        borderRadius: 100,
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
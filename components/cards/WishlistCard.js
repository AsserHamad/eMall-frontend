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
import AwesomeAlert from 'react-native-awesome-alerts';
import { useState } from 'react';
import Icon from '../utils/Icon';

function WishlistCard(props){
    const item = props.item.product;
    const [showAlert, setShowAlert] = useState(false);
    return (
        <View style={styles.itemContainer}>
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
                <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                    {item.discount ?
                    <View style={{width: '50%'}}>
                        <Text style={{textDecorationLine: 'line-through', fontSize: 14, marginRight: 10}}>{item.price} EGP</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.price * (1 - item.discount)} EGP</Text>
                    </View> 
                    :
                    <Text style={{fontSize: 20, fontWeight: 'bold', width: '70%'}}>{item.price} EGP</Text>
                    }
                    <View style={styles.buttonsContainer}>
                        {/* Add to Cart */}
                        {!containsItem(props.cart, item) ? 
                            <TouchableOpacity onPress={() => props.addToCart(props.item)}>
                                <Icon type="AntDesign" name="shoppingcart" size={24} style={styles.button} color={'white'} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => props.removeFromCart(props.item.product)}>
                                <Icon type="MaterialIcons" name="remove-shopping-cart" size={24} style={{...styles.button, backgroundColor: gStyles.secondary_light }} color={'red'} />
                            </TouchableOpacity>
                        }
                        {/* Delete Item */}
                        <TouchableOpacity onPress={() => setShowAlert(true)}>
                            <AntDesign name="delete" size={24} style={styles.button} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Removing Item"
                message="Are you sure you want to remove this item from your wishlist?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Remove"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    props.removeFromWishlist(item)
                    setShowAlert(false);
                }}
                onDismiss={() => {
                    setShowAlert(false);
                }}
            />
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
        backgroundColor: gStyles.primary_light,
        padding: RFPercentage(1),
        borderRadius: 100,
        marginHorizontal: RFPercentage(0.5)
    }
})

const containsItem = (arr, product) => {
    return arr.filter(prod => prod.product._id === product._id).length;
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
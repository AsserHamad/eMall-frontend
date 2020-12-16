import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
import { connect } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../src/actions/cart';

function CartCard(props){
    const item = props.item.product;
    const quantity = props.item.quantity;
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
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Quantity:</Text>
                    <TouchableOpacity onPress={() => props.decreaseQuantity(props.item)}>
                        <AntDesign color={gStyles.primary} style={{marginLeft: 10, marginRight: 5}} size={20} name="minuscircle" />
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', color: gStyles.secondary, fontSize: 20}}>{quantity}</Text>
                    <TouchableOpacity onPress={() => props.increaseQuantity(props.item)}>
                        <AntDesign color={gStyles.primary} style={{marginLeft: 5}} size={20} name="pluscircle" />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                    {item.discount ?
                    <View style={{width: '75%'}}>
                        <Text style={{textDecorationLine: 'line-through', fontSize: 14, marginRight: 10}}>{item.price} EGP</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.price * (1 - item.discount)} EGP</Text>
                    </View> 
                    :
                    <Text style={{fontSize: 20, fontWeight: 'bold', width: '70%'}}>{item.price} EGP</Text>
                    }
                    <View>
                        <TouchableOpacity onPress={() => props.removeFromCart(item)}>
                            <AntDesign name="delete" size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        height: 160,
        shadowColor: 'black',
        shadowRadius: 10,
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
        width: 100,
        height: 100
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        maxWidth: 300
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column'
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (product) => dispatch(removeFromCart(product)),
        increaseQuantity: (product) => dispatch(increaseQuantity(product)),
        decreaseQuantity: (product) => dispatch(decreaseQuantity(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
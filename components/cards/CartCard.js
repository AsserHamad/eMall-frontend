import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gStyles } from '../../global.style';

import { connect } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../src/actions/cart';
import Icon from '../utils/Icon';
import { useLanguage } from '../../hooks/language';
import TextLato from '../utils/TextLato';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

function CartCard(props){
    const item = props.item.product;
    const language = useLanguage();
    const picks = props.item.picks ? props.item.picks : []
    const quantity = props.item.quantity;
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.itemImage} source={{uri: item.images[0]}} />
            </View>
            <View style={styles.itemDetails}>
                <TextLato bold style={styles.itemTitle} >{item.title[language]}</TextLato>
                <TextLato style={{color: '#888'}}>{picks.map(option => option.title[language]).toString()}</TextLato>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Sold By:</Text>
                    <Text style={{paddingLeft: 5, fontWeight: 'bold', color: gStyles.secondary}}>{item.store.title}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Quantity:</Text>
                    <TouchableOpacity onPress={() => props.decreaseQuantity(props.item)}>
                        <Icon type="AntDesign" color={gStyles.primary_light} style={{marginLeft: 10, marginRight: 5}} size={15} name="minuscircle" />
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', color: gStyles.secondary, fontSize: 20}}>{quantity}</Text>
                    <TouchableOpacity onPress={() => props.increaseQuantity(props.item)}>
                        <Icon type="AntDesign" color={gStyles.primary_light} style={{marginLeft: 5}} size={15} name="pluscircle" />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40, display: 'flex', flexDirection: 'row'}}>
                    {item.discount ?
                    <View style={{width: '75%'}}>
                        <Text style={{textDecorationLine: 'line-through', fontSize: 14, marginRight: 10}}>{item.price + picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0)} EGP</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.price * (1 - item.discount)} EGP</Text>
                    </View> 
                    :
                    <Text style={{fontSize: 20, fontWeight: 'bold', width: '70%'}}>{(item.price + picks.reduce((pickA, pickB) => pickA + pickB.extraPrice ,0)).toFixed(2)} EGP</Text>
                    }
                    <View>
                        <TouchableOpacity onPress={() => props.removeFromCart(item)}>
                            <Icon type="AntDesign" name="delete" size={24} style={{alignItems: 'center', justifyContent: 'center'}} color={gStyles.primary_light} />
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
        minHeight: height * 0.18,
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
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
import { connect, useSelector } from 'react-redux';
import CartCard from '../components/cards/CartCard';
import TextLato from '../components/utils/TextLato';
import { gStyles } from '../global.style';

function Cart(props){
    const cart = useSelector(state => state.cartReducer.cart);
    const [subtotal, setSubtotal] = useState(0);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if(cart.length){
                const st = cart.reduce((itemA, itemB) => {
                    const price = itemB.product.price;
                    const quantity = itemB.quantity;
                    const extraPrice = itemB.picks.reduce((itemA, itemB) => {
                        return itemA + itemB.extraPrice;
                    }, 0)
                    return itemA + (price + extraPrice) * quantity
                }
                ,0)
            setSubtotal(st);
            setDisabled(false);
        } else setDisabled(true);
    }, [cart])
    return (
        <View style={styles.container}>
            <ScrollView>
                {props.cart.map(item => {
                    return <CartCard key={Math.random()} item={item} />
                })}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextLato style={{fontSize: RFPercentage(2), width : '20%'}}>Subtotal:</TextLato>
                    <TextLato style={{fontSize: RFPercentage(3.5)}}>{subtotal.toFixed(2)} EGP</TextLato>
                </View>
                <TouchableOpacity onPress={() => !disabled ? props.navigation.push('Payment') : null}>
                    <View style={{...styles.buttonContainer, backgroundColor: disabled ? '#777' : gStyles.primary_light}}>
                        <TextLato bold style={{color: 'white', fontSize: RFPercentage(2.3)}}>CHECKOUT</TextLato>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        backgroundColor: gStyles.background
    },
    bottomContainer: {
        width,
        height: height * 0.12,
        padding: width * 0.03,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: height * 0.01,
        backgroundColor: gStyles.primary_light,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        padding: height * 0.01
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

export default connect(mapStateToProps)(Cart);
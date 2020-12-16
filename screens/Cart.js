import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
import { connect } from 'react-redux';
import CartCard from '../components/cards/CartCard';
import { gStyles } from '../global.style';

function Cart(props){
    return (
        <ScrollView style={styles.container}>
            {props.cart.map(item => {
                return <CartCard key={item.product._id} item={item} />
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        backgroundColor: gStyles.background
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

export default connect(mapStateToProps)(Cart);
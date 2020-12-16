import { ADD_TO_CART, REMOVE_FROM_CART, QUANTITY_INCREASE, QUANTITY_DECREASE } from './types';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    product
})

export const removeFromCart = (product) => ({
    type: REMOVE_FROM_CART,
    product
})

export const increaseQuantity = (product) => ({
    type: QUANTITY_INCREASE,
    product
})

export const decreaseQuantity = (product) => ({
    type: QUANTITY_DECREASE,
    product
})
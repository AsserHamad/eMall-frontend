import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, QUANTITY_INCREASE_WISHLIST, QUANTITY_DECREASE_WISHLIST } from './types';

export const addToWishlist = (product) => ({
    type: ADD_TO_WISHLIST,
    product
})

export const removeFromWishlist = (product) => ({
    type: REMOVE_FROM_WISHLIST,
    product
})

export const wishlistIncreaseQuantity = (product) => ({
    type: QUANTITY_INCREASE_WISHLIST,
    product
})

export const wishlistDecreaseQuantity = (product) => ({
    type: QUANTITY_DECREASE_WISHLIST,
    product
})
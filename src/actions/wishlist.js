import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_WISHLIST } from './types';

export const addToWishlist = (product) => ({
    type: ADD_TO_WISHLIST,
    product
})

export const removeFromWishlist = (product) => ({
    type: REMOVE_FROM_WISHLIST,
    product
})

export const setWishlist = (wishlist) => ({
    type: SET_WISHLIST,
    wishlist
})
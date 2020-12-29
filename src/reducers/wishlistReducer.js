import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, QUANTITY_INCREASE_WISHLIST, QUANTITY_DECREASE_WISHLIST } from '../actions/types';

const initialState = {
    wishlist: []
}

const wishlistReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, action.product]
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter(prod => prod.product._id !== action.product._id)
            };
        case QUANTITY_INCREASE_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.map(prod => {
                    if(prod.product._id === action.product.product._id){
                        prod.quantity++;
                    }
                    return prod;
                })
            }
        case QUANTITY_DECREASE_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.map(prod => {
                    if(prod.product._id === action.product.product._id && prod.quantity > 1){
                        prod.quantity--;
                    }
                    return prod;
                })
            }
        default:
            return state;
    }
}

export default wishlistReducer;
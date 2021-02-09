import { ADD_TO_CART, REMOVE_FROM_CART, QUANTITY_INCREASE, QUANTITY_DECREASE, SET_CART } from '../actions/types';

const initialState = {
    cart: {
        products: []
    }
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CART:
            return {
                ...state,
                cart: action.cart
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(prod => prod.product._id !== action.product._id)
            };
        case QUANTITY_INCREASE:
            return {
                ...state,
                cart: state.cart.map(prod => {
                    if(prod.product._id === action.product.product._id){
                        prod.quantity++;
                    }
                    return prod;
                })
            }
        case QUANTITY_DECREASE:
            return {
                ...state,
                cart: state.cart.map(prod => {
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

export default cartReducer;
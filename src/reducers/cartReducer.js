import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
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
        default:
            return state;
    }
}

export default cartReducer;
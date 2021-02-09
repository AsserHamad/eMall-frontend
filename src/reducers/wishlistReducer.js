import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_WISHLIST } from '../actions/types';

const initialState = {
    wishlist: {
        products: []
    }
}

const wishlistReducer = (state = initialState, action) => {
    if(action.type === SET_WISHLIST)console.log('SETTING WISHLIST', action)
    switch(action.type){
        case SET_WISHLIST: 
            return {
                ...state,
                wishlist: action.wishlist
            }
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
        default:
            return state;
    }
}

export default wishlistReducer;
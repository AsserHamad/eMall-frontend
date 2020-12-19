import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
    loggedIn: false,
    account: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                account: action.data.client,
                token: action.data.token
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                account: null,
                token: null
            };
        default:
            return state;
    }
}

export default authReducer;
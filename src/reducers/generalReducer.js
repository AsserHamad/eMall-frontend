import { CHANGE_LANGUAGE, CHANGE_FIRST_TIME, CHANGE_VARIABLES } from '../actions/types';
    
// 0: English
const initialState = {
    language: 0,
    firstTime: true,
    variables: {
        shipping: 80,
        homeAd: 20,
        bannerAd: 20,
        dealOfTheDay: 30
    }
}

const generalReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        case CHANGE_FIRST_TIME:
            return {
                ...state,
                firstTime: action.firstTime
            }
        case CHANGE_VARIABLES:
            return {
                ...state,
                variables: action.variables
            }
        default:
            return state;
    }
}
export default generalReducer;
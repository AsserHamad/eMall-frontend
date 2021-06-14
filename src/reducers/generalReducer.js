import { CHANGE_LANGUAGE, CHANGE_FIRST_TIME } from '../actions/types';
    
// 0: English
const initialState = {
    language: 0,
    firstTime: true
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
        default:
            return state;
    }
}
export default generalReducer;
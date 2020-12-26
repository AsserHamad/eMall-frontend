import { CHANGE_LANGUAGE } from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loadLanguage = async () => 
    AsyncStorage.getItem('language')
    .then(val => {
        console.log('val is', val)
        if(val !== null){
            return Number(val);
        } else {
            AsyncStorage.setItem('language', 0)
            .then(() => 0);
        }
    })
    .catch(err => console.log(err));

    
// 0: English
const initialState = {
    language: 0
}

const generalReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
        default:
            return state;
    }
}
export default generalReducer;
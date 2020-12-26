import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import generalReducer from './reducers/generalReducer';

const rootReducer = combineReducers({
    authReducer,
    cartReducer,
    generalReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
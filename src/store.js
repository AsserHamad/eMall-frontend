import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    authReducer,
    cartReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
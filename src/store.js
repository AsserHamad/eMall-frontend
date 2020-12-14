import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    authReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
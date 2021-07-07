import AsyncStorage from '@react-native-async-storage/async-storage';
import HTTP from '../utils/axios';
import { LOGIN, LOGIN_SELLER, LOGOUT, UPDATE_ACCOUNT } from './types';

export const login = (account) => {
    AsyncStorage.setItem('@accessToken', JSON.stringify({type: 'client', token: account.accessToken}));
    account.refreshToken && AsyncStorage.setItem('@refreshToken', account.refreshToken);
    HTTP.defaults.headers.post['authorization'] = account.accessToken;
    HTTP.defaults.headers.get['authorization'] = account.accessToken;
    HTTP.defaults.headers.put['authorization'] = account.accessToken;
    HTTP.defaults.headers.delete['authorization'] = account.accessToken;
    AsyncStorage.setItem('@firstTime', 'true');
    return {
        type: LOGIN,
        data: account
    }
};

export const loginSeller = (account) => {
    
    AsyncStorage.setItem('@accessToken', JSON.stringify({type: 'store', token: account.accessToken}));
    account.refreshToken && AsyncStorage.setItem('@refreshToken', account.refreshToken);
    HTTP.defaults.headers.post['authorization'] = account.accessToken;
    HTTP.defaults.headers.get['authorization'] = account.accessToken;
    HTTP.defaults.headers.put['authorization'] = account.accessToken;
    HTTP.defaults.headers.delete['authorization'] = account.accessToken;    
    console.log('setting seller', account)
    return {
        type: LOGIN_SELLER,
        data: account
    }
}


export const logout = () => {
    AsyncStorage.removeItem('@accessToken');
    AsyncStorage.removeItem('@refreshToken');
    AsyncStorage.removeItem('@firstTime');
    return {
        type: LOGOUT
    }
}

export const updateAccount = (account) => ({
    type: UPDATE_ACCOUNT,
    account
})
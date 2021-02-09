import { LOGIN, LOGIN_SELLER, LOGOUT, UPDATE_ACCOUNT } from './types';

export const login = (account) => ({
    type: LOGIN,
    data: account
})

export const loginSeller = (account) => ({
    type: LOGIN_SELLER,
    data: account
})


export const logout = () => ({
    type: LOGOUT
})

export const updateAccount = (account) => ({
    type: UPDATE_ACCOUNT,
    account
})
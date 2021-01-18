import { LOGIN, LOGIN_SELLER, LOGOUT } from './types';

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
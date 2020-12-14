import { LOGIN, LOGOUT} from './types';

export const login = (account) => ({
    type: 'LOGIN',
    data: account
})


export const logout = () => ({
    type: 'LOGOUT',
})
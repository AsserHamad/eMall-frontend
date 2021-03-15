import { LOGIN, LOGIN_SELLER, LOGOUT, UPDATE_ACCOUNT } from '../actions/types';

const initialState = {
    // ? Store Account
    // loggedIn: true,
    // account: {
    //     title: 'Store Manager',
    //     authorities: [ 0, 1, 2, 3, 4, 5 ],
    //     languagePref: 0,
    //     _id: "5fe6103ae8a7b8485c32e927",
    //     name: 'Asser Hamad',
    //     email: 'asserhamad96@gmail.com',
    //     __v: 0,
    //     facebookId: '10158499234586418',
    //     credit: 0
    //   },
    // store: {
    //     approved: true,
    //     _id: "5fe6103ae8a7b8485c32e926",
    //     title: 'The Body Shop',
    //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The-Body-Shop-Logo.svg/480px-The-Body-Shop-Logo.svg.png'
    //   },
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXIiOnsidGl0bGUiOiJTdG9yZSBNYW5hZ2VyIiwiYXV0aG9yaXRpZXMiOlsxLDIsMyw0LDVdLCJsYW5ndWFnZVByZWYiOjAsIl9pZCI6IjVmZTYxMDNhZThhN2I4NDg1YzMyZTkyNyIsInN0b3JlIjp7ImFwcHJvdmVkIjp0cnVlLCJfaWQiOiI1ZmU2MTAzYWU4YTdiODQ4NWMzMmU5MjYiLCJ0aXRsZSI6IlRoZSBCb2R5IFNob3AiLCJsb2dvIjoiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy90aHVtYi9jL2MxL1RoZS1Cb2R5LVNob3AtTG9nby5zdmcvNDgwcHgtVGhlLUJvZHktU2hvcC1Mb2dvLnN2Zy5wbmcifSwibmFtZSI6IkFzc2VyIEhhbWFkIiwiZW1haWwiOiJhc3NlcmhhbWFkOTZAZ21haWwuY29tIiwiX192IjowLCJmYWNlYm9va0lkIjoiMTAxNTg0OTkyMzQ1ODY0MTgifSwiaWF0IjoxNjEwOTI2ODc4LCJleHAiOjE2MTg3MDI4Nzh9.we0N_GklmU6FVXpBKixoEWWipMpSAFaAwINq2J3hp8Y',
    // type: 'store'

    // ? Client Account
    loggedIn: false,
    account: null,
    type: 'client'
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                account: action.data.client,
                token: action.data.token,
                type: action.data.type
            }
        case LOGIN_SELLER:
            return {
                ...state,
                loggedIn: true,
                account: action.data.seller,
                store: action.data.store,
                token: action.data.token,
                type: action.data.type
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                account: null,
                token: null,
                type: 'client'
            }
        case UPDATE_ACCOUNT: 
            return {
                ...state,
                account: action.account
            };
        default:
            return state;
    }
}

export default authReducer;
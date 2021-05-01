import {
    REQUEST_AUTHENTICATION,
    RECEIVE_AUTHENTICATION,
    RECEIVE_AUTHENTICATION_ERROR,
    CLEAR_AUTHENTICATION_DATA,
    LOGIN_API_URL, POST
} from '../../app/common/constant.js';


export const requestLogin = (loginModel) => {
    return {
        type: REQUEST_AUTHENTICATION,
        endpoint: LOGIN_API_URL,
        verb: POST,
        headers: { 'Content-type': 'application/json' },
        payload: JSON.stringify(loginModel),
        onSuccess: receiveLoginResponse,
        onFail: receiveLoginError
    };
};

export const receiveLoginResponse = (payload) => {
    return {
        type: RECEIVE_AUTHENTICATION,
        payload: payload
    };
};

export const receiveLoginError = (error) => {
    return {
        type: RECEIVE_AUTHENTICATION_ERROR,
        error: error
    };
};

export const clearLoginData = () => {
    return {
        type: CLEAR_AUTHENTICATION_DATA
    };
};
import {
    REQUEST_AUTHENTICATION,
    RECEIVE_AUTHENTICATION,
    RECEIVE_AUTHENTICATION_ERROR,
    CLEAR_AUTHENTICATION_DATA
} from '../../app/common/constant.js';


const INITIAL_STATE = {
    payload: null,
    isFailed: false,
    isLoading: false,
    error: null
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_AUTHENTICATION:
            return {
                ...state,
                payload: null,
                isFailed: false,
                isLoading: true,
                error: null
            };

        case RECEIVE_AUTHENTICATION:
            return {
                ...state,
                payload: action.payload,
                isFailed: false,
                isLoading: false,
                error: null
            };

        case RECEIVE_AUTHENTICATION_ERROR:
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                error: action.error
            };

        case CLEAR_AUTHENTICATION_DATA:
            return {
                payload: null,
                isFailed: false,
                isLoading: false,
                error: null
            };

        default: return state;
    };
};

export default loginReducer;
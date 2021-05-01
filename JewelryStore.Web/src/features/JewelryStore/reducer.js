import {
    REQUEST_JEWELRY_STORE_CALCULATION,
    RECEIVE_JEWELRY_STORE_CALCULATION,
    RECEIVE_JEWELRY_STORE_CALCULATION_ERROR
} from '../../app/common/constant.js';


const INITIAL_STATE = {
    payload: null,
    isFailed: false,
    isLoading: false,
    error: null
};

const jewelryStoreReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_JEWELRY_STORE_CALCULATION:
            return {
                ...state,
                payload: null,
                isFailed: false,
                error: null,
                isLoading: true,
            };

        case RECEIVE_JEWELRY_STORE_CALCULATION:
            return {
                ...state,
                payload: action.payload,
                isFailed: false,
                isLoading: false
            };

        case RECEIVE_JEWELRY_STORE_CALCULATION_ERROR:
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                error: action.error
            };

        default: return state;
    };
};

export default jewelryStoreReducer;
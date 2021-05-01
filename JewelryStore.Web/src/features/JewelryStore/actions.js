import {
    REQUEST_JEWELRY_STORE_CALCULATION,
    RECEIVE_JEWELRY_STORE_CALCULATION,
    RECEIVE_JEWELRY_STORE_CALCULATION_ERROR,
    CALCULATE_API_URL, POST
} from '../../app/common/constant.js';


export const requestJewelryStoreCalculation = (calculationModel, token) => {
    return {
        type: REQUEST_JEWELRY_STORE_CALCULATION,
        endpoint: CALCULATE_API_URL,
        token: token,
        verb: POST,
        headers: { 'Content-type': 'application/json' },
        payload: JSON.stringify(calculationModel),
        onSuccess: receiveJewelryStoreCalculation,
        onFail: receiveJewelryStoreCalculationError
    };
};

export const receiveJewelryStoreCalculation = (payload) => {
    return {
        type: RECEIVE_JEWELRY_STORE_CALCULATION,
        payload: payload
    };
};

export const receiveJewelryStoreCalculationError = (error) => {
    return {
        type: RECEIVE_JEWELRY_STORE_CALCULATION_ERROR,
        error: error
    };
};
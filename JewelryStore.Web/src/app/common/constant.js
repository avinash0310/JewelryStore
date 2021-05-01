export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
export const RECEIVE_AUTHENTICATION_ERROR = 'RECEIVE_AUTHENTICATION_ERROR';
export const CLEAR_AUTHENTICATION_DATA = 'CLEAR_AUTHENTICATION_DATA';
export const API_BASE_ADDRESS = 'https://localhost:44348';
export const LOGIN_API_URL = API_BASE_ADDRESS + '/api/Authenticate/Login';
export const JEWELRY_STORE_PATH = '/jewelrystore';
export const LOGIN_PAGE_PATH = '/login';
export const DEFAULT_PAGE_PATH = '/';
export const POST = 'POST';
export const TOKEN = 'token';
export const ENDPOINT = 'endpoint';
export const PRIVILEGED = 'Privileged';
export const MIN_LENGTH = 5;
export const MAX_LENGTH = 12;
export const DEFAULT_DISCOUNT = 2;
export const CALCULATE_API_URL = API_BASE_ADDRESS + '/api/JewelryStore/Calculate';
export const REQUEST_JEWELRY_STORE_CALCULATION = 'REQUEST_JEWELRY_STORE_CALCULATION';
export const RECEIVE_JEWELRY_STORE_CALCULATION = 'RECEIVE_JEWELRY_STORE_CALCULATION';
export const RECEIVE_JEWELRY_STORE_CALCULATION_ERROR = 'RECEIVE_JEWELRY_STORE_CALCULATION_ERROR';
export const GOLD_PRICE_VALIDATION_MSG = 'Please provide valid Gold Price.';
export const GOLD_WEIGHT_VALIDATION_MSG = 'Please provide valid Gold Weight.';
export const DISCOUNT_VALIDATION_MSG = 'Please provide valid Discount Rate.';
export const INVALID_CREDENTIAL_VALIDATION_MSG = 'Please provide valid credential.';
export const PLEASE_CALCULATE_VALIDATION_MSG = 'Please calculate before print.';
export const INVALID_USER_NAME_VALIDATION_MSG = 'The field username must be a string with a minimum length of 5 and a maximum length of 12.';
export const INVALID_PASSWORD_VALIDATION_MSG = 'The field password must be a string with a minimum length of 5 and a maximum length of 10.';
export const FAILED_MESSAGE = 'Some error occurred please try again.';
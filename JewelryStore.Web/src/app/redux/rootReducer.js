import { combineReducers } from 'redux';
import loginReducer from '../../features/Login/reducer';
import jewelryStoreReducer from '../../features/JewelryStore/reducer';

const rootReducer = combineReducers({
    loginDetails: loginReducer,
    jewelryStore: jewelryStoreReducer,
});

export default rootReducer;
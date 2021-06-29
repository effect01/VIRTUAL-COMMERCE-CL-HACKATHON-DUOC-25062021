import {combineReducers} from 'redux';
import authReducer from './auth';
import cartReducers from './cart';


export default combineReducers({
	auth: authReducer,
    cart: cartReducers,
});

//  importing Redux

//  in here there is all the reducer

import { combineReducers } from 'redux';

import userReducer from  './user/user-reducer';

export default combineReducers({
	user: userReducer
});

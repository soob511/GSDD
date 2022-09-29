import { combineReducers } from 'redux';
import Auth from './Auth';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  Auth,
  userReducer,
});

export default rootReducer;

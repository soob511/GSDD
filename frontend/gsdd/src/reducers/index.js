import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import tmapReducer from './tmapReducer';

const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  tmapReducer,
});

export default rootReducer;

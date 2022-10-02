import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import tmapReducer from './tmapReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tokenReducer', ' userReducer'],
  blacklist: ['tmapReducer'],
};

const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  tmapReducer,
});

export default persistReducer(persistConfig, rootReducer);

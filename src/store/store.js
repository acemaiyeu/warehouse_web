import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import counterReducer from './counterReducer';

// Gom nhiều reducer lại (nếu có)
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Tạo store với middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import StringReducer from './stringReducer';
import SelectedStringReducer from './selectedStringReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  strings: StringReducer,
  selectedString: SelectedStringReducer
});

export default rootReducer;
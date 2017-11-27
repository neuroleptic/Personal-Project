import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import StringReducer from './stringReducer';
import SelectedStringReducer from './selectedStringReducer';
import SelectedReviewReducer from './selectedReviewReducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  strings: StringReducer,
  selectedString: SelectedStringReducer,
  selectedReview: SelectedReviewReducer
});

export default rootReducer;
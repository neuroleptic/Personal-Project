import {
  GET_REVIEW
} from '../actions';

export default (selectedReview = {}, action) => {
  switch(action.type) {
    case GET_REVIEW:
      return action.payload.data;
    default:
      return selectedReview;
  }
};
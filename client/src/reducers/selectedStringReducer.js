import {
  GET_STRING
} from '../actions';

export default (selectedString = {}, action) => {
  switch(action.type) {
    case GET_STRING:
      return action.payload.data;
    default:
      return selectedString;
  }
};
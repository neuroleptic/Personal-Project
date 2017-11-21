import {
  GET_STRINGS
} from '../actions';

export default (strings = [], action) => {
  switch(action.type) {
    case GET_STRINGS:
      return action.payload.data;
    default:
      return strings;
  }
};
import axios from 'axios';

axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const GET_STRINGS = 'GET_STRINGS';
export const GET_STRING = 'GET_STRING';
export const ADD_STRING = 'ADD_STRING';
export const EDIT_STRING = 'EDIT_STRING';
export const DELETE_STRING = 'DELETE_STRING';

export const ADD_REVIEW = 'ADD_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = ({username, password, confirmPassword}, history) => {  
  return (dispatch) => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    return axios
      .post(`${ROOT_URL}/register`, { username, password })
      .then((data) => {
        dispatch({
          type: USER_AUTHENTICATED,
          payload: data
        });
        history.push('/strings');        
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const login = ({username, password}, history) => {
  return (dispatch) => {
    return axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then((data) => {
        dispatch({
          type: USER_AUTHENTICATED,
          payload: data
        });
        history.push('/strings');
      })
      .catch(() => {
        dispatch(authError('Incorrect email/password combo'));
      });
  };
};

export const logout = () => {  
  return (dispatch) => {
    return axios
      .get(`${ROOT_URL}/logout`)
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED
        });
      })
      .catch(() => {
        dispatch(authError('Error Logging out'));
      });
  };
};

export const getStrings = () => {
  return (dispatch) => {
    return axios
      .get(`${ROOT_URL}/strings`)
      .then((data) => {
        dispatch({
          type: GET_STRINGS,
          payload: data
        });
      })
  };
};

export const getString = (id) => {
  return (dispatch) => {
    return axios
      .get(`${ROOT_URL}/strings/${id}`)
      .then((data) => {
        dispatch({
          type: GET_STRING,
          payload: data
        });
      })
  };
};

export const addString = (stringData, history) => {
  return (dispatch) => {
    return axios
      .post(`${ROOT_URL}/strings/`, stringData)
      .then((data) => {
        dispatch({
          type: ADD_STRING,
          payload: data
        });
        history.push('/strings');        
      })
  };
};

export const editString = (id, stringData, history) => {
  return (dispatch) => {
    return axios
      .put(`${ROOT_URL}/strings/${id}`, stringData)
      .then((data) => {
        dispatch({
          type: EDIT_STRING,
          payload: data
        });
        history.push(`/strings/${id}`);        
      });
  };
};

export const deleteString = (id, history) => {
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/strings/${id}`)
      .then((data) => {
        dispatch({
          type: DELETE_STRING
        });
        history.push('/strings');        
      });
  };
};

export const addReview = (id, reviewData, history) => {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/strings/${id}/reviews`, reviewData)
      .then((data) => {
        dispatch({
          type: ADD_REVIEW,
          payload: data
        });
        history.push(`/strings/${id}`);                
      });
  };
};

export const editReview = (id, reviewId, reviewData, history) => {
  return (dispatch) => {
    axios
      .put(`${ROOT_URL}/strings/${id}/reviews/${reviewId}`, reviewData)
      .then((data) => {
        dispatch({
          type: EDIT_STRING,
          payload: data
        });
        history.push(`/strings/${id}`);        
      })
  };
};

export const deleteReview = (id, reviewId, history) => {
  return (dispatch) => {
    axios
      .delete(`${ROOT_URL}/strings/${id}/reviews/${reviewId}`)
      .then((data) => {
        dispatch({
          type: DELETE_REVIEW
        });
        history.push(`/strings/${id}`);        
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
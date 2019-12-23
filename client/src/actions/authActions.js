import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
  //user loading

  dispatch({ type: USER_LOADING });

  //get token from localStorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      'Content-type': 'application'
    }
  };
  if (token) {
    config.header['x-auth-token'] = token;
  }

  axios
    .get('/api/auth/user', config)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

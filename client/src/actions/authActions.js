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

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// register user

export const register = payload => dispatch => {
  const { name, email, password } = payload;

  //headers

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  return new Promise(function(resolve, reject) {
    axios
      .post('/api/users', body, config)
      .then(res => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
        resolve({
          msg: 'User registered successfully'
        });
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL
        });
      });
  });
};

//login user
export const login = payload => dispatch => {
  const { email, password } = payload;

  //headers

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  return new Promise(function(resolve, reject) {
    axios
      .post('/api/auth', body, config)
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        resolve({
          msg: 'User logged in successfully'
        });
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOGIN_FAIL
        });
      });
  });
};

//logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//setup config/header and token
export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //header
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  //if token add to header
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

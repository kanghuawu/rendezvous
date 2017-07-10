import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

// const ROOT_URL = 'http://localhost:8000';
const ROOT_URL = 'https://immense-wildwood-85181.herokuapp.com';

export function signinUser({ email, password }){
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/api/users/signin/`, {email, password})
      .then(response => {
        console.log(response);
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', 'JWT ' + response.data.token);
        // - redirecto to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(response => {
        // if request is bad...
        // - Show an error to user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/signup/`, { email, password })
      .then(response => {
        console.log(response);
        browserHistory.push('/signin');
      })
      .catch(response => {
        console.log(response.response);
        dispatch(authError(response.response.data.error));
      });
  }
}

export function  signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}

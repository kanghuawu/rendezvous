import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  FETCH_ACTIVITIES,
  SELECTED_ACTIVITY,
  FETCH_ACTIVITY_TYPES,
} from './types';

const ROOT_URL = 'http://localhost:8000';
// const ROOT_URL = 'https://immense-wildwood-85181.herokuapp.com';

export function signInUser({ email, password }){
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/signin/`, {email, password})
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', 'JWT ' + response.data.token);
        browserHistory.push('/checkin');
      })
      .catch(response => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signUpUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/signup/`, { email, password })
      .then(response => {
        browserHistory.push('/signin');
      })
      .catch(response => {
        dispatch(authError(response.response.data.error));
      });
  }
}

export function  signOutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function fetchActivities() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/activities/`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_ACTIVITIES,
          payload: response.data
        })
      });
  }
}

export function fetchActivityDetail(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/activities/${id}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: SELECTED_ACTIVITY,
          payload: response.data
        })
      });
  }
}


export function createActivity() {

}

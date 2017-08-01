import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  FETCH_ACTIVITIES,
  SELECTED_ACTIVITY,
  FETCH_ACTIVITY_TYPES,
  FETCH_MY_ELDER_LIST,
  FETCH_PROFILE,
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

export function fetchActivityTypes() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/activities/types/`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_ACTIVITY_TYPES,
          payload: response.data
        })
      });
  }
}

export function fetchMyEldersList() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/elders/mylist/`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MY_ELDER_LIST,
          payload: response.data
        })
      });
  }
}

export function createActivity({elder, activity_type, duration, date, status}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/activities/`, {elder, activity_type, duration, date, status},
      { headers: { authorization: localStorage.getItem('token')}}
      )
      .then(response => {
        browserHistory.push('/history');
      })
      .catch(response => {
        console.log(response);
      });
  }
}

export function fetchProfile() {
  axios.get(`${ROOT_URL}/api/users/profile/`,
    { headers: { authorization: localStorage.getItem('token')}})
  .then(response => {
    return response;
  })
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/users/profile/`, 
      { headers: { authorization: localStorage.getItem('token')}}
      )
      .then(response => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data
        })
      })
      .catch(response => {
        console.log(response);
      });
  }
}

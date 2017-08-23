import axios from "axios";
import { destroy } from "redux-form";
// import { hashHistory } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_ACTIVITIES,
  SELECTED_ACTIVITY,
  FETCH_ACTIVITY_TYPES,
  FETCH_ELDER_LIST,
  DELETE_ELDER_LIST,
  CLEAR_SEARCH,
  SEARCH_LIST,
  DESELECT_SEARCH,
  ADD_ELDERS_LIST,
  FETCH_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  SELECT_ELDER,
  DESELECT_ELDER,
  RESET_SELECTION
} from "./types";

const ROOT_URL = "http://localhost:8000";
// const ROOT_URL = 'https://immense-wildwood-85181.herokuapp.com';

export const signInUser = ({ email, password }, callback) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/users/signin/`, { email, password })
      .then(response => {
        localStorage.setItem("token", "JWT " + response.data.token);
        dispatch({ type: AUTH_USER });
        callback();
      })
      .catch(response => {
        dispatch(authError(response.response.data));
      });
  };
};

export const signUpUser = ({ email, password }, callback) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/users/signup/`, { email, password })
      .then(response => {
        localStorage.setItem("token", "JWT " + response.data.token);
        dispatch({ type: AUTH_USER });
        callback();
      })
      .catch(response => {
        dispatch(authError(response.response.data));
      });
  };
};

export const signOutUser = () => {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const clearAuthError = () => {
  return { type: CLEAR_AUTH_ERROR };
};

export const fetchActivities = (url = `${ROOT_URL}/api/activities/`) => {
  return function(dispatch) {
    axios
      .get(url, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_ACTIVITIES,
          payload: response.data
        });
      });
  };
};

export const fetchActivityDetail = id => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/activities/${id}`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: SELECTED_ACTIVITY,
          payload: response.data
        });
      });
  };
};

export const fetchActivityTypes = () => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/api/activities/types/`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_ACTIVITY_TYPES,
          payload: response.data
        });
      });
  };
};

export const createActivity = (
  { elder, activity_type, duration, date, status, notes },
  callback
) => {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/api/activities/create/`,
        { elder, activity_type, duration, date, status, notes },
        { headers: { authorization: localStorage.getItem("token") } }
      )
      .then(response => {
        callback();
      })
      .catch(response => {
        console.log(response);
      });
  };
};

// elder

export const fetchMyEldersList = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/elders/mylist/`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_ELDER_LIST,
          payload: response.data
        });
      });
  };
};

export const deleteMyEldersList = id => {
  return dispatch => {
    axios
      .delete(`${ROOT_URL}/api/elders/mylist/delete/${id}`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: DELETE_ELDER_LIST,
          payload: id
        });
      });
  };
};

// search

export const searchEldersList = ({ firstname, lastname, phone }) => {
  return dispatch => {
    axios
      .get(
        `${ROOT_URL}/api/elders/?firstname=${firstname}&lastname=${lastname}&phone=${phone}`,
        {
          headers: { authorization: localStorage.getItem("token") }
        }
      )
      .then(response => {
        dispatch({
          type: SEARCH_LIST,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response);
      });
  };
};

export const searchEldersListByUrl = url => {
  return dispatch => {
    axios
      .get(url, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: SEARCH_LIST,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response);
      });
  };
};

export const clearSearch = () => {
  return dispatch => dispatch({ type: CLEAR_SEARCH });
};

export const addEldersList = elderList => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/api/elders/mylist/add/`, elderList, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({ type: DESELECT_SEARCH, payload: elderList });
      })
      .catch(response => {
        console.log(response);
      });
  };
};

// Profile

export const fetchProfile = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/api/users/profile/`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data
        });
      })
      .catch(response => {
        console.log(response);
      });
  };
};

export const updateProfile = ({ first_name, last_name, phone }, callback) => {
  return dispatch => {
    axios
      .put(
        `${ROOT_URL}/api/users/profile/`,
        { first_name, last_name, phone },
        {
          headers: { authorization: localStorage.getItem("token") }
        }
      )
      .then(response => {
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data
        });
      })
      .then(() => {
        callback();
      })
      .catch(response => {
        console.log(response);
      });
  };
};

export const updatePassword = (password, callback) => {
  return dispatch => {
    axios
      .put(`${ROOT_URL}/api/users/password/`, password, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        localStorage.removeItem("token");
        localStorage.setItem("token", "JWT " + response.data.token);
        callback();
      })
      .catch(response => {
        dispatch(authError(response.response.data));
      });
  };
};

// select
export const selectElder = id => {
  return { type: SELECT_ELDER, payload: id };
};

export const deselectElder = id => {
  return { type: DESELECT_ELDER, payload: id };
};

export const resetSelection = id => dispatch => {
  return { type: RESET_SELECTION };
};

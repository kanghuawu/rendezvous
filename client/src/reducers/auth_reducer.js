import { AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY_TYPES,
  FETCH_MY_ELDER_LIST,
  FETCH_PROFILE,
  SEARCH_ELDERS_LIST
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type){
    case AUTH_USER:
      return { ...state, error: '',authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_ACTIVITIES:
      return { ...state, activities: action.payload};
    case FETCH_ACTIVITY_TYPES:
      return { ...state, activityTypes: action.payload};
    case FETCH_MY_ELDER_LIST:
      return { ...state, myElderList: action.payload};
    case FETCH_PROFILE:
      return { ...state, profile: action.payload};
    case SEARCH_ELDERS_LIST:
      return { ...state, searchList: action.payload};
  }
  return state;
}

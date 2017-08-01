import { AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY_TYPES,
  FETCH_MY_ELDER_LIST,
  FETCH_PROFILE
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
      // debugger;
      return { ...state, activities: action.payload};
    case FETCH_ACTIVITY_TYPES:
      // console.log(action.payload);
      return { ...state, activityTypes: action.payload};
    case FETCH_MY_ELDER_LIST:
      return { ...state, myElderList: action.payload};
    case FETCH_PROFILE:
      return { ...state, profile: action.payload};
  }
  return state;
}

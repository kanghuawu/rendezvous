import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY_TYPES,
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_ACTIVITIES:
      return { ...state, activities: action.payload};
    case FETCH_ACTIVITY_TYPES:
      return { ...state, activityTypes: action.payload};
    default: 
      return state;
  }
}
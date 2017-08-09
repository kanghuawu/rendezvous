import { 
  FETCH_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_PROFILE:
      return action.payload;
    case UPDATE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
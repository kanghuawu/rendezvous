import {
  FETCH_ELDER_LIST,
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_ELDER_LIST:
      return action.payload;
    default: 
      return state;
  }
}
import {
  FETCH_LEADRER_BOARD_LIST,
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_LEADRER_BOARD_LIST:
      return action.payload;
    default: 
      return state;
  }
}

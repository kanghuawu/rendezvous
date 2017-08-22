import {
  FETCH_LEADER_BOARD_LIST,
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_LEADER_BOARD_LIST:
      return action.payload;
    default: 
      return state;
  }
}

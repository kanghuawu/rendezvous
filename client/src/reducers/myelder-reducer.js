import _ from 'lodash';
import {
  FETCH_ELDER_LIST,
  DELETE_ELDER_LIST
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_ELDER_LIST:
      return _.mapKeys(action.payload, 'match_id');
    case DELETE_ELDER_LIST:
      return _.omit(state, action.payload);
    default: 
      return state;
  }
}
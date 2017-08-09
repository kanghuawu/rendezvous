import _ from 'lodash';
import {
  SEARCH_LIST,
  CLEAR_SEARCH
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case SEARCH_LIST:
      return _.mapKeys(action.payload, 'elder_id');
    case CLEAR_SEARCH:
      return null;
    default: 
      return state;
  }
}
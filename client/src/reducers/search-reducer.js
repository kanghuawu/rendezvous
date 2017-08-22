import _ from 'lodash';
import {
  SEARCH_LIST,
  DESELECT_SEARCH,
  CLEAR_SEARCH
} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case SEARCH_LIST:
      // console.log(action.payload);
      return _.mapKeys(action.payload, 'elder_id');
    case DESELECT_SEARCH:
      return _.omit(state, action.payload); 
    case CLEAR_SEARCH:
      return [];
    default: 
      return state;
  }
}
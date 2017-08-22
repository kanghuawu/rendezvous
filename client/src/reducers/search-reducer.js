import _ from 'lodash';
import {
  SEARCH_LIST,
  DESELECT_SEARCH,
  CLEAR_SEARCH
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case SEARCH_LIST:
    console.log(action.payload);
      return {
        previous: action.payload.previous,
        next: action.payload.next,
        count: action.payload.count,
        results: _.mapKeys(action.payload.results, 'elder_id')};
    case DESELECT_SEARCH:
      return {...state, results: _.omit(state.results, action.payload)};
    case CLEAR_SEARCH:
      return {};
    default: 
      return state;
  }
}
import _ from 'lodash';
import {
  SELECT_ELDER,
  DESELECT_ELDER,
  RESET_SELECTION
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case SELECT_ELDER:
      console.log(action.payload);
      return [...state, action.payload];
    case DESELECT_ELDER:
      return _.without(state, action.payload);
    case RESET_SELECTION:
      return [];
    default: 
      return state;
  }
}
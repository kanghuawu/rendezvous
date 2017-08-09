import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth-reducer';
import profile from './profile-reducer';
import myelder from './myelder-reducer';
import search from './search-reducer';

const rootReducer = combineReducers({
  form,
  profile,
  myelder,
  search,
  auth
});

export default rootReducer;

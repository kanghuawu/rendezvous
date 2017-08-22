import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth-reducer';
import activity from './activity-reducer';
import profile from './profile-reducer';
import myelder from './myelder-reducer';
import search from './search-reducer';
import leaderboard from './leaderboard-reducer'
import select from './select-reducer';

const rootReducer = combineReducers({
  form,
  leaderboard,
  activity,
  profile,
  myelder,
  search,
  select,
  auth
});

export default rootReducer;

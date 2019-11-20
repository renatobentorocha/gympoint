import { combineReducers } from 'redux';

import auth from './auth/reducer';
import checkin from './checkin/reducer';

export default combineReducers({
  auth,
  checkin,
});

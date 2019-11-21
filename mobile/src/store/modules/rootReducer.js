import { combineReducers } from 'redux';

import auth from './auth/reducer';
import checkin from './checkin/reducer';
import assistance from './assistance/reducer';

export default combineReducers({
  auth,
  checkin,
  assistance,
});

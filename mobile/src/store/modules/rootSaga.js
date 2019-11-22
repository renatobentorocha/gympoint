import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import checkin from './checkin/sagas';
import assistance from './assistance/sagas';
import student from './student/sagas';

export default function* rootSaga() {
  return yield all([auth, checkin, assistance, student]);
}

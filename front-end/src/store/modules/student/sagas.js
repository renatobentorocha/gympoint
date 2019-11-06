import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { loadStudentSuccess, studentFailure } from './actions';

export function* loadStudent({ payload }) {
  try {
    const response = yield call(api.get, 'students');

    console.tron.log(response.data);
    yield put(loadStudentSuccess(response.data));
  } catch (err) {
    yield put(studentFailure());
  }
}

export default all([takeLatest('@student/LOAD_STUDENT_REQUEST', loadStudent)]);

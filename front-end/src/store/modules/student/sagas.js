import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  loadStudentSuccess,
  studentFailure,
  addStudentSuccess,
} from './actions';

export function* loadStudent({ payload }) {
  try {
    const { filter } = payload;

    let resource = null;

    if (filter) {
      resource = `students?q=${filter}`;
    } else {
      resource = `students`;
    }

    const response = yield call(api.get, resource);
    yield put(loadStudentSuccess(response.data));
  } catch (err) {
    yield put(studentFailure());
  }
}

export function* addStudent({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'students', data);

    yield put(addStudentSuccess(response.data));
  } catch (err) {
    yield put(studentFailure());
  }
}

export default all([
  takeLatest('@student/LOAD_STUDENT_REQUEST', loadStudent),
  takeLatest('@student/ADD_STUDENT_REQUEST', addStudent),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import { CurrencyFormat } from '~/util/formatters/number';

import api from '~/services/api';

import {
  loadEnrollmentsSuccess,
  showEnrollmentSuccess,
  enrollmentFailure,
  addEnrollmentsSuccess,
  editEnrollmentSuccess,
  deleteEnrollmentSuccess,
} from './actions';

export function* loadEnrollments() {
  try {
    const response = yield call(api.get, 'enrollments');

    yield put(loadEnrollmentsSuccess(response.data));
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export function* showEnrollment({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `/enrollments/${id}`);

    yield put(showEnrollmentSuccess(data));
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export function* addEnrollment({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'enrollments', data);

    yield put(addEnrollmentsSuccess(response.data));

    history.push('/matriculas');
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export function* editEnrollment({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.put, `/enrollment/${data.id}`, data);

    yield put(editEnrollmentSuccess(response.data));

    history.push('/matriculas');
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    const { data } = payload;

    yield call(api.delete, `/enrollments/${data}`);

    yield put(deleteEnrollmentSuccess(data));
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export default all([
  takeLatest('@plan/LOAD_PLANS_REQUEST', loadEnrollments),
  takeLatest('@plan/SHOW_PLAN_REQUEST', showEnrollment),
  takeLatest('@plan/ADD_PLAN_REQUEST', addEnrollment),
  takeLatest('@plan/EDIT_PLAN_REQUEST', editEnrollment),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deleteEnrollment),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import parseISO from 'date-fns/parseISO';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import history from '~/services/history';

import api from '~/services/api';

import {
  loadEnrollmentsSuccess,
  loadPlansSuccess,
  showEnrollmentSuccess,
  enrollmentFailure,
  addEnrollmentsSuccess,
  editEnrollmentSuccess,
  deleteEnrollmentSuccess,
} from './actions';

export function* loadEnrollments({ payload }) {
  try {
    const { pagination } = payload;

    let resource = null;

    if (pagination) {
      resource = `enrollments?page=${pagination.page}&page_size=${pagination.pageSize}`;
    } else {
      resource = `enrollments`;
    }

    const response = yield call(api.get, resource);

    const enrollments = response.data.enrollments.map(e => ({
      ...e,
      start_date: format(parseISO(e.start_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
      end_date: format(parseISO(e.end_date), "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    }));

    const { total, page, page_count } = response.data;

    yield put(loadEnrollmentsSuccess({ enrollments, total, page, page_count }));
  } catch (err) {
    yield put(enrollmentFailure());
  }
}

export function* loadPlans() {
  try {
    const response = yield call(api.get, 'plans');

    yield put(loadPlansSuccess(response.data.plans));
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

    const response = yield call(api.put, `/enrollments/${data.id}`, data);

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
  takeLatest('@enrollment/LOAD_ENROLLMENTS_REQUEST', loadEnrollments),
  takeLatest('@enrollment/LOAD_PLANS_REQUEST', loadPlans),
  takeLatest('@enrollment/SHOW_ENROLLMENT_REQUEST', showEnrollment),
  takeLatest('@enrollment/ADD_ENROLLMENT_REQUEST', addEnrollment),
  takeLatest('@enrollment/EDIT_ENROLLMENT_REQUEST', editEnrollment),
  takeLatest('@enrollment/DELETE_ENROLLMENT_REQUEST', deleteEnrollment),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';

import api from '~/services/api';

import {
  loadStudentsSuccess,
  studentFailure,
  addStudentSuccess,
  editStudentSuccess,
  deleteStudentSuccess,
} from './actions';

export function* loadStudent({ payload }) {
  try {
    const { filter, pagination } = payload;

    const filter_query = filter ? `q=${filter}` : null;

    const pagination_query = pagination
      ? `page=${pagination.page}&page_size=${pagination.pageSize}`
      : null;

    let resource = null;

    if (filter) {
      if (pagination) {
        resource = `students?${filter_query}&${pagination_query}`;
      } else {
        resource = `students?q=${filter}`;
      }
    } else if (pagination) {
      resource = `students?${pagination_query}`;
    } else {
      resource = `students`;
    }

    const response = yield call(api.get, resource);

    yield put(loadStudentsSuccess(response.data));
  } catch (err) {
    yield put(studentFailure());
  }
}

export function* addStudent({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'students', data);

    yield put(addStudentSuccess(response.data));

    history.push('/alunos');
  } catch (err) {
    yield put(studentFailure());
  }
}

export function* editStudent({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.put, `/students/${data.id}`, data);

    yield put(editStudentSuccess(response.data));

    history.push('/alunos');
  } catch (err) {
    yield put(studentFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { data } = payload;

    yield call(api.delete, `/students/${data}`);

    yield put(deleteStudentSuccess(data));
  } catch (err) {
    yield put(studentFailure());
  }
}

export default all([
  takeLatest('@student/LOAD_STUDENTS_REQUEST', loadStudent),
  takeLatest('@student/ADD_STUDENT_REQUEST', addStudent),
  takeLatest('@student/EDIT_STUDENT_REQUEST', editStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);

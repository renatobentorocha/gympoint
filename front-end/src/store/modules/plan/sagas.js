import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';

import api from '~/services/api';

import {
  loadPlansSuccess,
  showPlanSuccess,
  planFailure,
  addPlanSuccess,
  editPlanSuccess,
} from './actions';

export function* loadPlans() {
  try {
    console.tron.log('loadPlans');
    const response = yield call(api.get, 'plans');

    yield put(loadPlansSuccess(response.data));
  } catch (err) {
    console.tron.log(err);
    yield put(planFailure());
  }
}

export function* showPlan({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/plans/${id}`);
    yield put(showPlanSuccess(response.data));
  } catch (err) {
    yield put(planFailure());
  }
}

export function* addPlan({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'plans', data);

    yield put(addPlanSuccess(response.data));

    history.push('/alunos');
  } catch (err) {
    yield put(planFailure());
  }
}

export function* editPlan({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.put, `/plans/${data.id}`, data);

    yield put(editPlanSuccess(response.data));

    history.push('/alunos');
  } catch (err) {
    yield put(planFailure());
  }
}

export default all([
  takeLatest('@plan/LOAD_PLANS_REQUEST', loadPlans),
  takeLatest('@plan/SHOW_PLAN_REQUEST', showPlan),
  takeLatest('@plan/ADD_PLAN_REQUEST', addPlan),
  takeLatest('@plan/EDIT_PLAN_REQUEST', editPlan),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '~/services/history';
import { CurrencyFormat } from '~/util/formatters/number';

import api from '~/services/api';

import {
  loadPlansSuccess,
  showPlanSuccess,
  planFailure,
  addPlanSuccess,
  editPlanSuccess,
  deletePlanSuccess,
} from './actions';

export function* loadPlans() {
  try {
    const response = yield call(api.get, 'plans');

    const data = response.data.map(plan => {
      return {
        ...plan,
        duration:
          plan.duration > 1 ? `${plan.duration} meses` : `${plan.duration} mês`,
        price: CurrencyFormat(plan.price),
      };
    });

    yield put(loadPlansSuccess(data));
  } catch (err) {
    yield put(planFailure());
  }
}

export function* showPlan({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `/plans/${id}`);

    yield put(
      showPlanSuccess({
        ...data,
        total: CurrencyFormat(data.duration * data.price),
        unformatted_price: data.price,
        price: CurrencyFormat(data.price),
      })
    );
  } catch (err) {
    yield put(planFailure());
  }
}

export function* addPlan({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'plans', data);

    yield put(addPlanSuccess(response.data));

    history.push('/planos');
  } catch (err) {
    yield put(planFailure());
  }
}

export function* editPlan({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.put, `/plans/${data.id}`, data);

    yield put(editPlanSuccess(response.data));

    history.push('/planos');
  } catch (err) {
    yield put(planFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { data } = payload;

    yield call(api.delete, `/plans/${data}`);

    yield put(deletePlanSuccess(data));
  } catch (err) {
    yield put(planFailure());
  }
}

export default all([
  takeLatest('@plan/LOAD_PLANS_REQUEST', loadPlans),
  takeLatest('@plan/SHOW_PLAN_REQUEST', showPlan),
  takeLatest('@plan/ADD_PLAN_REQUEST', addPlan),
  takeLatest('@plan/EDIT_PLAN_REQUEST', editPlan),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
]);

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  loadHelpOrderSuccess,
  showHelpOrderSuccess,
  answerHelpOrderSuccess,
  HelpOrderFailure,
} from './actions';

export function* loadHelpOrder({ payload }) {
  try {
    const { pagination } = payload;

    let resource = null;

    if (pagination) {
      resource = `help_orders?page=${pagination.page}&page_size=${pagination.pageSize}`;
    } else {
      resource = `help_orders`;
    }

    const response = yield call(api.get, resource);

    yield put(loadHelpOrderSuccess(response.data));
  } catch (err) {
    yield put(HelpOrderFailure());
  }
}

export function* showHelpOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `help_orders/${id}`);

    yield put(showHelpOrderSuccess(response.data));
  } catch (err) {
    yield put(HelpOrderFailure());
  }
}

export function* answeHelpOrder({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, `help_orders/${data.id}/answer`, {
      answer: data.answer,
    });

    yield put(answerHelpOrderSuccess(response.data));
  } catch (err) {
    yield put(HelpOrderFailure());
  }
}

export default all([
  takeLatest('@help_order/LOAD_HELP_ORDER_REQUEST', loadHelpOrder),
  takeLatest('@help_order/SHOW_HELP_ORDER_REQUEST', showHelpOrder),
  takeLatest('@help_order/ANSWER_HELP_ORDER_REQUEST', answeHelpOrder),
]);

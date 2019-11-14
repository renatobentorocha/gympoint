import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { loadHelpOrderSuccess, HelpOrderFailure } from './actions';

export function* loadHelpOrder() {
  try {
    const response = yield call(api.get, 'help_orders');

    yield put(loadHelpOrderSuccess(response.data));
  } catch (err) {
    yield put(HelpOrderFailure());
  }
}

export default all([
  takeLatest('@help_order/LOAD_HELP_ORDER_REQUEST', loadHelpOrder),
]);

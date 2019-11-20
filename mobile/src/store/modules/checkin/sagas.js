import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { loadCheckInsSuccess, checkInFailure } from './actions';

export function* loadCheckIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/students/${id}/checkins`);

    yield put(loadCheckInsSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha ao carregar os check-ins');
    yield put(checkInFailure());
  }
}

export default all([takeLatest('@checkin/LOAD_CHECK_IN_REQUEST', loadCheckIn)]);

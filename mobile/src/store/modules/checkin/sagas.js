import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { distanceToNow } from '~/util/dateFormat';
import api from '~/services/api';

import { loadCheckInsSuccess, checkInSuccess, checkInFailure } from './actions';

export function* loadCheckIn({ payload }) {
  try {
    const { id, page } = payload;

    const response = yield call(
      api.get,
      `/students/${id}/checkins?page=${page}`
    );

    const data = response.data.map(checkin => ({
      id: checkin.id,
      date: distanceToNow(checkin.createdAt),
    }));

    yield put(loadCheckInsSuccess(data, page));
  } catch (err) {
    Alert.alert('Falha ao carregar os check-ins');
    yield put(checkInFailure());
  }
}

export function* checkIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `/students/${id}/checkins`);

    const data = {
      id: response.data.id,
      date: distanceToNow(response.data.createdAt),
    };

    yield put(checkInSuccess(data));
  } catch (err) {
    if (err.response.status === 403) {
      Alert.alert(
        'Permitido cinco check-ins num intervalo de sete dias corridos'
      );
    }

    yield put(checkInFailure());
  }
}

export default all([
  takeLatest('@checkin/LOAD_CHECK_IN_REQUEST', loadCheckIn),
  takeLatest('@checkin/CHECK_IN_REQUEST', checkIn),
]);

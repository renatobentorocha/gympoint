import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { distanceToNow } from '~/util/dateFormat';
import api from '~/services/api';

import {
  loadAssitancesSuccess,
  addAssitanceSuccess,
  assitanceFailure,
} from './actions';

export function* loadAssistance({ payload }) {
  try {
    const { id, page } = payload;

    const response = yield call(
      api.get,
      `/students/${id}/help_orders?page=${page}`
    );

    const data = response.data.map(value => ({
      id: value.id,
      answered: !!value.answer_at,
      label: value.answer_at ? 'Respondido' : 'Sem resposta',
      answerAt: distanceToNow(
        value.answer_at ? value.answer_at : value.createdAt
      ),
      question: value.question,
    }));

    yield put(loadAssitancesSuccess(data, page));
  } catch (err) {
    Alert.alert('Falha ao carregar solicitações de ajuda');
    yield put(assitanceFailure());
  }
}

export function* addAssistance({ payload }) {
  try {
    const { id, question } = payload;

    yield call(api.post, `/students/${id}/help_orders`, {
      question,
    });

    yield put(addAssitanceSuccess());
  } catch (err) {
    Alert.alert('Falha ao solicitar de ajuda');

    yield put(assitanceFailure());
  }
}

export default all([
  takeLatest('@assistance/LOAD_ASSISTANCE_REQUEST', loadAssistance),
  takeLatest('@assistance/ADD_ASSISTANCE_REQUEST', addAssistance),
]);

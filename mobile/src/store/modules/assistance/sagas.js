import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { distanceToNow } from '~/util/dateFormat';
import api from '~/services/api';

import {
  loadAssitancesSuccess,
  assitanceSuccess,
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

    yield put(loadAssitancesSuccess(data));
  } catch (err) {
    Alert.alert('Falha ao carregar solicitações de ajuda');
    yield put(assitanceFailure());
  }
}

export function* addAssistance({ payload }) {
  try {
    const { id, question } = payload;

    const response = yield call(api.post, `/students/${id}/help_orders`, {
      question,
    });

    const data = {
      id: response.data.id,
      answered: !!response.data.answer_at,
      label: response.data.answer_at ? 'Respondido' : 'Sem resposta',
      answerAt: distanceToNow(
        response.data.answer_at
          ? response.data.answer_at
          : response.data.createdAt
      ),
      question: response.data.question,
    };

    yield put(assitanceSuccess(data));
  } catch (err) {
    Alert.alert('Falha ao solicitar de ajuda');

    yield put(assitanceFailure());
  }
}

export default all([
  takeLatest('@assistance/LOAD_ASSISTANCE_REQUEST', loadAssistance),
  takeLatest('@assistance/ASSISTANCE_REQUEST', addAssistance),
]);

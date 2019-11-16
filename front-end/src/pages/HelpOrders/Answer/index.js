import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import {
  cancelHelpOrderEditRequest,
  answerHelpOrderRequest,
} from '~/store/modules/help_order/actions';

import { Container, Wrapper, Spinner } from './styles';

export default function Answer() {
  const schema = Yup.object().shape({
    id: Yup.number(),
    answer: Yup.string().required('A resposta é obrigatória'),
  });
  const dispatch = useDispatch();
  const { order, loading } = useSelector(state => ({
    order: state.help_order.order,
    loading: state.help_order.loading,
  }));

  function handleClose(e) {
    if (e.target.classList.contains('modal_container')) {
      dispatch(cancelHelpOrderEditRequest());
    }
  }

  function handleAnswer(data) {
    dispatch(answerHelpOrderRequest(data));
  }

  return (
    <Container className="modal_container" onClick={handleClose}>
      <Wrapper>
        <header>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{order.question}</p>
        </header>
        <Form schema={schema} onSubmit={handleAnswer}>
          <Input hidden name="id" value={order.id} onChange={() => {}} />
          <label htmlFor="title">
            SUA RESPOSTA
            <Input multiline name="answer" />
          </label>
          <button type="submit">
            {loading ? <Spinner /> : 'Responder aluno'}
          </button>
        </Form>
      </Wrapper>
    </Container>
  );
}

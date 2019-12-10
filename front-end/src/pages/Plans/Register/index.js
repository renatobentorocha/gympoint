import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  OnlyNumber,
  ToDecimal,
  CurrencyFormat,
  RemoveCurrencySign,
} from '~/util/formatters/number';

import {
  showPlanRequest,
  addPlanRequest,
  editPlanRequest,
} from '~/store/modules/plan/actions';

import Header from '~/pages/Header/Register';

import { Container } from './styles';

export default function Register({ match, history }) {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');

  const totalRef = useRef(null);

  useEffect(() => {
    function showplan() {
      const { params } = match;
      const { id } = params;

      if (id) {
        dispatch(showPlanRequest(id));
      }
    }

    showplan();
  }, [dispatch, match]);

  const { loading, editing_data } = useSelector(state => ({
    loading: state.plan.loading,
    editing_data: state.plan.editing_data,
  }));

  useEffect(() => {
    function fillPlan() {
      if (editing_data) {
        setDuration(editing_data.duration);
        setPrice(editing_data.unformatted_price);
        totalRef.current.value = editing_data.total ? editing_data.total : '';
        setTitle('Edição de plano');
      } else {
        setTitle('Cadastro de plano');
      }
    }

    fillPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing_data]);

  const schema = Yup.object().shape({
    title: Yup.string().required('O título do plano'),
    duration: Yup.string().required('A duração do é obrigatória'),
    price: Yup.string().required('O preço mensal é obrigatório'),
  });

  function handleTotalDuration(value) {
    totalRef.current.value = CurrencyFormat(value * price);
  }

  function handleTotalPrice(value) {
    totalRef.current.value = CurrencyFormat(duration * value);
  }

  function handlePrice(e) {
    e.target.value = ToDecimal(e.target.value);
    setPrice(e.target.value);
    handleTotalPrice(e.target.value);
  }

  function handleDuration(e) {
    e.target.value = OnlyNumber(e.target.value);
    setDuration(e.target.value);
    handleTotalDuration(e.target.value);
  }

  function format(e) {
    e.target.value = CurrencyFormat(ToDecimal(e.target.value));
  }

  function clean_format(e) {
    e.target.value = RemoveCurrencySign(e.target.value);
  }

  function handleSubmit(data, { resetForm }) {
    const plan = { ...data, price: ToDecimal(data.price) };

    if (editing_data) {
      dispatch(editPlanRequest({ id: editing_data.id, ...plan }));
    } else {
      dispatch(addPlanRequest(plan));
    }

    resetForm();
  }

  return (
    <Container>
      <Header
        form_id="plan_form"
        title={title}
        loading={loading}
        history={history}
      />

      <Form
        initialData={editing_data}
        schema={schema}
        onSubmit={handleSubmit}
        id="plan_form"
      >
        <label htmlFor="title">
          TÍTULO DO PLANO
          <Input name="title" type="text" />
        </label>

        <div>
          <label htmlFor="duration">
            DURAÇÃO (em meses)
            <Input name="duration" type="text" onChange={handleDuration} />
          </label>
          <label htmlFor="price">
            PREÇO MENSAL
            <Input
              name="price"
              type="text"
              onBlur={format}
              onFocus={clean_format}
              onChange={handlePrice}
            />
          </label>
          <label htmlFor="total">
            PREÇO TOTAL
            <input ref={totalRef} name="total" type="text" disabled />
          </label>
        </div>
      </Form>
    </Container>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

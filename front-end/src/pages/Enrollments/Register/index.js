import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';

import pt from 'date-fns/locale/pt';
import isDate from 'date-fns/isDate';
import addMonths from 'date-fns/addMonths';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { DropdownIndicator } from '~/components/ReactSelect/DropdownIndicator';
import {
  loadPlansRequest,
  addEnrollmentRequest,
} from '~/store/modules/enrollment/actions';

import api from '~/services/api';

import { CurrencyFormat } from '~/util/formatters/number';

import {
  Container,
  Spinner,
  TAsyncSelect,
  TReactSelect,
  TDatePicker,
  TMdArrowDropDown,
} from './styles';

export default function Register({ match, history }) {
  const dispatch = useDispatch();
  const priceRef = useRef(null);
  const endDateRef = useRef(null);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    function loadPlans() {
      dispatch(loadPlansRequest());
    }

    loadPlans();
  }, [dispatch]);

  const { loading, plans } = useSelector(state => ({
    loading: state.student.loading,
    plans: state.enrollment.plans.map(plan => ({
      value: plan.id,
      label: plan.title,
      duration: plan.duration,
      price: plan.price,
    })),
  }));

  const schema = Yup.object().shape({
    student: Yup.object()
      .shape({
        value: Yup.number().required('O aluno é obrigatório'),
      })
      .nullable()
      .required('O aluno é obrigatório'),
    plan: Yup.object()
      .shape({
        value: Yup.number().required('O aluno é obrigatório'),
      })
      .nullable()
      .required('O plano é obrigatório'),
    start_date: Yup.string('A data de início é obrigatória')
      .nullable()
      .required('A data de início é obrigatória'),
  });

  function handleSubmit(data, { resetForm }) {
    const end_date = endDateRef.current.value.split('/');

    const enrollment = {
      student_id: selectedStudent.value,
      plan_id: selectedPlan.value,
      start_date: format(selectedDate, 'yyyy-MM-dd'),
      end_date: format(
        new Date(end_date[2], end_date[1] - 1, end_date[0]),
        'yyyy-MM-dd'
      ),
      price: priceRef.current.value,
    };

    dispatch(addEnrollmentRequest(enrollment));
  }

  function handleBack() {
    history.push('/matriculas');
  }

  async function loadOptions(input) {
    const response = await api.get(`/students?q=${input}`);

    const options = response.data.map(student => ({
      value: student.id,
      label: student.name,
    }));

    return options;
  }

  function setEndDate(date, plan_duration) {
    const parsedDate = date
      ? parseISO(`${format(date, 'yyyy-MM-dd')}T11:00:00`)
      : null;

    if (parsedDate && plan_duration && isDate(parsedDate)) {
      endDateRef.current.value = format(
        addMonths(
          new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDay()
          ),
          plan_duration
        ),
        'dd/MM/yyyy'
      );
    }
  }

  function setPrice(plan_duration, price) {
    priceRef.current.value = CurrencyFormat(plan_duration * price);
  }

  function handleChangePlan(plan) {
    setSelectedPlan(plan);
    setDuration(plan.duration);
    setEndDate(selectedDate, plan.duration);
    setPrice(plan.duration, plan.price);
  }

  function handleEndDateChange(date) {
    setSelectedDate(date);
    setEndDate(date, duration);
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de matrícula</strong>
        <div>
          <button type="button" onClick={() => handleBack()}>
            <MdChevronLeft size={20} />
            VOLTAR
          </button>
          <button type="submit" form="enrollment_form">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <MdCheck size={20} /> SALVAR
              </>
            )}
          </button>
        </div>
      </header>

      <Form schema={schema} onSubmit={handleSubmit} id="enrollment_form">
        <div>
          <TAsyncSelect
            name="student"
            value={selectedStudent}
            components={{ DropdownIndicator }}
            loadOptions={loadOptions}
            defaultOptions
            placeholder="Buscar aluno"
            onChange={data => setSelectedStudent(data)}
          />
        </div>
        <div>
          <label htmlFor="plan">
            PLANO
            <TReactSelect
              value={selectedPlan}
              components={{ DropdownIndicator }}
              placeholder="Selecione o plano"
              options={plans}
              name="plan"
              onChange={data => handleChangePlan(data)}
            />
          </label>

          <label htmlFor="start_date">
            DATA DE INÍCIO
            <TDatePicker
              locale={pt}
              selected={selectedDate}
              name="start_date"
              placeholderText="Escolha a data"
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
            />
            <div data-picker-arrow>
              <TMdArrowDropDown />
            </div>
          </label>

          <label htmlFor="end_date">
            DATA DE TÉRMINO
            <input ref={endDateRef} name="end_date" type="text" disabled />
          </label>

          <label htmlFor="price">
            VALOR FINAL
            <input ref={priceRef} name="price" type="text" disabled />
          </label>
        </div>
      </Form>
    </Container>
  );
}

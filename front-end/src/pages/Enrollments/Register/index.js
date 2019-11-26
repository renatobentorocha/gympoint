import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import isDate from 'date-fns/isDate';
import addMonths from 'date-fns/addMonths';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { DropdownIndicator } from '~/components/ReactSelect/DropdownIndicator';
import {
  loadPlansRequest,
  addEnrollmentRequest,
  editEnrollmentRequest,
} from '~/store/modules/enrollment/actions';

import api from '~/services/api';

import { CurrencyFormat, ToDecimal } from '~/util/formatters/number';

import {
  Container,
  Button,
  TAsyncSelect,
  TReactSelect,
  TDatePicker,
  TMdArrowDropDown,
} from './styles';

export default function Register({ match, history }) {
  const dispatch = useDispatch();
  const priceRef = useRef(null);
  const endDateRef = useRef(null);

  const [edting, setEdting] = useState('');
  const [title, setTitle] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    async function showStudent() {
      const { id } = match.params;

      if (id) {
        const response = await api.get(`/students/${id}`);

        setSelectedStudent({
          value: response.data.id,
          label: response.data.name,
          enrollment: response.data.enrollment,
        });
      }
    }

    showStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEndDate = useCallback(() => {
    if (selectedPlan && isDate(selectedDate)) {
      endDateRef.current.value = format(
        addMonths(selectedDate, selectedPlan.duration),
        'dd/MM/yyyy'
      );
    }
  }, [selectedDate, selectedPlan]);

  useEffect(() => {
    updateEndDate();
  }, [updateEndDate]);

  useEffect(() => {
    function setPrice() {
      priceRef.current.value =
        selectedPlan &&
        CurrencyFormat(selectedPlan.duration * selectedPlan.price);
    }

    setPrice();
    updateEndDate();
  }, [selectedPlan, updateEndDate]);

  useEffect(() => {
    function fillToEdit() {
      if (selectedStudent && selectedStudent.enrollment) {
        setEdting(true);
        setTitle('Edição de matrícula');

        setSelectedPlan({
          value: selectedStudent.enrollment.plan.id,
          label: selectedStudent.enrollment.plan.title,
          duration: selectedStudent.enrollment.plan.duration,
          price: selectedStudent.enrollment.plan.price,
        });

        setSelectedDate(parseISO(selectedStudent.enrollment.start_date));
      } else {
        setTitle('Cadastro de matrícula');
        setEdting(false);
      }
    }

    fillToEdit();
  }, [selectedStudent]);

  useEffect(() => {
    function loadPlans() {
      dispatch(loadPlansRequest());
    }

    loadPlans();
  }, [dispatch]);

  const { loading, plans } = useSelector(state => ({
    loading: state.enrollment.loading,
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

  function handleSubmit() {
    const end_date = endDateRef.current.value.split('/');

    const enrollment = {
      student_id: selectedStudent.value,
      plan_id: selectedPlan.value,
      start_date: selectedDate,
      end_date: new Date(end_date[2], end_date[1] - 1, end_date[0]),
      price: ToDecimal(priceRef.current.value),
    };

    if (edting) {
      dispatch(
        editEnrollmentRequest({
          id: selectedStudent.enrollment.id,
          ...enrollment,
        })
      );
    } else {
      dispatch(addEnrollmentRequest(enrollment));
    }
  }

  function handleBack() {
    history.push('/matriculas');
  }

  async function loadOptions(input) {
    const response = await api.get(`/students?q=${input}&page_size=10`);

    const options = response.data.students.map(student => ({
      value: student.id,
      label: student.name,
      enrollment: student.enrollment,
    }));

    return options;
  }

  function handleChangePlan(plan) {
    setSelectedPlan(plan);
  }

  function handleEndDateChange(date) {
    setSelectedDate(date);
  }

  function handleChangeSelectStudent(data) {
    setSelectedStudent(data);
  }

  return (
    <Container>
      <header>
        <strong>{title}</strong>
        <div>
          <Button icon="MdChevronLeft" title="VOLTAR" onClick={handleBack} />
          <Button
            loading={loading}
            icon="MdCheck"
            title="SALVAR"
            type="submit"
            form="enrollment_form"
          />
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
            onChange={data => handleChangeSelectStudent(data)}
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

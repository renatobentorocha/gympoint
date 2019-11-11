import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { DropdownIndicator } from '~/components/ReactSelect/DropdownIndicator';
import { loadPlansRequest } from '~/store/modules/plan/actions';

import api from '~/services/api';

import {
  Container,
  Spinner,
  FormWrapper,
  TAsyncSelect,
  TReactSelect,
  TDatePicker,
  TMdArrowDropDown,
} from './styles';

export default function Register({ match, history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    function loadPlans() {
      dispatch(loadPlansRequest());
    }

    loadPlans();
  }, [dispatch]);

  const { loading, plans } = useSelector(state => ({
    loading: state.student.loading,
    plans: state.plan.data.map(plan => ({ value: plan.id, label: plan.title })),
  }));

  const schema = Yup.object().shape({
    plan: Yup.string().required('O nome é obrigatório'),
    start_date: Yup.string().required('O peso é obrigatório'),
  });

  function handleSubmit(data, { resetForm }) {
    const student = {
      ...data,
      height: data.height.replace(/m/g, ''),
      weight: data.weight.replace(/kg/g, ''),
    };

    // if (editing_data) {
    //   dispatch(editStudentRequest({ id: editing_data.id, ...student }));
    // } else {
    //   dispatch(addStudentRequest(student));
    // }

    resetForm();
  }

  function handleBack() {
    history.push('/alunos');
  }

  async function loadOptions(input) {
    const response = await api.get(`/students?q=${input}`);

    const options = response.data.map(student => ({
      value: student.id,
      label: student.name,
    }));

    return options;
  }

  const handleInputChange = newValue => {
    console.tron.log(newValue);
  };

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
      <FormWrapper>
        <TAsyncSelect
          components={{ DropdownIndicator }}
          loadOptions={loadOptions}
          defaultOptions
          onChange={handleInputChange}
          placeholder="Buscar aluno"
        />
        <Form schema={schema} onSubmit={handleSubmit} id="enrollment_form">
          <label htmlFor="plan">
            PLANO
            <TReactSelect
              components={{ DropdownIndicator }}
              placeholder="Selecione o plano"
              options={plans}
              name="techs"
            />
          </label>

          <label htmlFor="email">
            DATA DE INÍCIO
            <TDatePicker name="begin_date" placeholderText="Escolha a data" />
            <div data-picker-arrow>
              <TMdArrowDropDown />
            </div>
          </label>

          <label htmlFor="age">
            DATA DE TÉRMINO
            <Input name="age" type="text" disabled />
          </label>

          <label htmlFor="weight">
            VALOR FINAL
            <Input name="weight" type="text" disabled />
          </label>
        </Form>
      </FormWrapper>
    </Container>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  showStudentRequest,
  addStudentRequest,
  editStudentRequest,
} from '~/store/modules/student/actions';
import { Container, Spinner } from './styles';

export default function Register({ match, history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    function showStudent() {
      const { params } = match;
      const { id } = params;

      if (id) {
        dispatch(showStudentRequest(id));
      }
    }

    showStudent();
  }, [dispatch, match]);

  const { loading, editing_data } = useSelector(state => ({
    loading: state.student.loading,
    editing_data: state.student.editing_data,
  }));

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.string('Deve ser uma idade valida').required(
      'A idade é obrigatória'
    ),
    weight: Yup.string().required('O peso é obrigatório'),
    height: Yup.string().required('A altura é obrigatória'),
  });

  function handleAge(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }

  function handleSign(e, focus, sign) {
    if (e.target.value && focus) {
      const regex = new RegExp(sign, 'g');
      e.target.value = e.target.value.replace(regex, '');
    } else {
      e.target.value = e.target.value !== '' ? `${e.target.value}${sign}` : '';
    }
  }

  function decimalFormat(e) {
    const weightOnlyNumber = e.target.value.replace(/[^0-9]/g, '');
    let value = weightOnlyNumber;

    if (weightOnlyNumber.length >= 3) {
      const decimal = weightOnlyNumber.substr(weightOnlyNumber.length - 2);
      const integer = weightOnlyNumber.substr(0, weightOnlyNumber.length - 2);

      value = (parseFloat(integer) + Number(decimal) / 100).toFixed(2);
    }

    return value;
  }

  function handleWeight(e) {
    e.target.value = decimalFormat(e);
  }

  function handleHeight(e) {
    e.target.value = decimalFormat(e);
  }

  function handleSubmit(data, { resetForm }) {
    const student = {
      ...data,
      height: data.height.replace(/m/g, ''),
      weight: data.weight.replace(/kg/g, ''),
    };

    if (editing_data) {
      dispatch(editStudentRequest({ id: editing_data.id, ...student }));
    } else {
      dispatch(addStudentRequest(student));
    }

    resetForm();
  }

  function handleBack() {
    history.push('/alunos');
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de aluno</strong>
        <div>
          <button type="button" onClick={() => handleBack()}>
            <MdChevronLeft size={20} />
            VOLTAR
          </button>
          <button type="submit" form="student_form">
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
      <Form
        initialData={editing_data}
        schema={schema}
        onSubmit={handleSubmit}
        id="student_form"
      >
        <label htmlFor="name">
          NOME COMPLETO
          <Input name="name" type="text" placeholder="Jhon Doe" />
        </label>

        <label htmlFor="email">
          ENDEREÇO DE E-MAIL
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </label>

        <div>
          <label htmlFor="age">
            IDADE
            <Input name="age" type="text" onChange={handleAge} />
          </label>
          <label htmlFor="weight">
            PESO (em kg)
            <Input
              name="weight"
              type="text"
              onBlur={e => handleSign(e, false, 'kg')}
              onFocus={e => handleSign(e, true, 'kg')}
              onChange={handleWeight}
            />
          </label>
          <label htmlFor="height">
            ALTURA
            <Input
              name="height"
              type="text"
              onBlur={e => handleSign(e, false, 'm')}
              onFocus={e => handleSign(e, true, 'm')}
              onChange={handleHeight}
            />
          </label>
        </div>
      </Form>
    </Container>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdChevronLeft } from 'react-icons/md';

import {
  addStudentRequest,
  editStudentRequest,
} from '~/store/modules/student/actions';

import api from '~/services/api';

import { ToDecimal, OnlyNumber } from '~/util/formatters/number';
import { Container, Spinner } from './styles';

export default function Register({ match, history }) {
  const [student, setStudent] = useState(null);
  const [title, setTitle] = useState('');
  const weightRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function showStudent() {
      const { id } = match.params;

      if (id) {
        const response = await api.get(`/students/${id}`);

        response.data.weight = `${response.data.weight}kg`;
        response.data.height = `${response.data.height}m`;

        setStudent(response.data);
        setTitle('Edição de aluno');
      } else {
        setTitle('Cadastro de aluno');
      }
    }

    showStudent();
  }, [dispatch, match, weightRef]);

  const { loading } = useSelector(state => ({
    loading: state.student.loading,
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
    e.target.value = OnlyNumber(e.target.value);
  }

  function handleSign(e, focus, sign) {
    if (e.target.value && focus) {
      const regex = new RegExp(sign, 'g');
      e.target.value = e.target.value.replace(regex, '');
    } else {
      e.target.value = e.target.value !== '' ? `${e.target.value}${sign}` : '';
    }
  }

  function handleWeight(e) {
    e.target.value = ToDecimal(e.target.value);
  }

  function handleHeight(e) {
    e.target.value = ToDecimal(e.target.value);
  }

  function handleSubmit(data) {
    const newStudent = {
      ...data,
      height: data.height.replace(/m/g, ''),
      weight: data.weight.replace(/kg/g, ''),
    };

    if (student) {
      dispatch(editStudentRequest({ id: student.id, ...newStudent }));
    } else {
      dispatch(addStudentRequest(newStudent));
    }
  }

  function handleBack() {
    history.push('/alunos');
  }

  return (
    <Container>
      <header>
        <strong>{title}</strong>
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
        initialData={student}
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

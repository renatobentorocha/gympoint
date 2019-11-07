import React, { useState, useEffect } from 'react';
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

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    function fillStudentProperties() {
      setAge(editing_data.age);
      setWeight(editing_data.weight);
      setHeight(editing_data.height);
    }

    if (editing_data) {
      fillStudentProperties();
    }
  }, [editing_data]);

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
    setAge(e.target.value.replace(/[^0-9]/g, ''));
  }

  function handleSignWeight(focus, sign) {
    if (focus) {
      const regex = new RegExp(sign, 'g');
      setWeight(weight.replace(regex, ''));
    } else {
      setWeight(weight ? `${weight}${sign}` : '');
    }
  }

  function handleSignHeight(focus, sign) {
    if (focus) {
      const regex = new RegExp(sign, 'g');
      setHeight(height.replace(regex, ''));
    } else {
      setHeight(height ? `${height}${sign}` : '');
    }
  }

  function handleSign(focus, sign) {
    if (sign === 'kg') {
      handleSignWeight(focus, sign);
    } else {
      handleSignHeight(focus, sign);
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
    setWeight(decimalFormat(e));
  }

  function handleHeight(e) {
    setHeight(decimalFormat(e));
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
            <Input name="age" type="text" onChange={handleAge} value={age} />
          </label>
          <label htmlFor="weight">
            PESO (em kg)
            <Input
              name="weight"
              type="text"
              onBlur={() => handleSign(false, 'kg')}
              onFocus={() => handleSign(true, 'kg')}
              onChange={handleWeight}
              value={weight}
            />
          </label>
          <label htmlFor="height">
            ALTURA
            <Input
              name="height"
              type="text"
              onBlur={() => handleSign(false, 'm')}
              onFocus={() => handleSign(true, 'm')}
              onChange={handleHeight}
              value={height}
            />
          </label>
        </div>
      </Form>
    </Container>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { loadStudentRequest } from '~/store/modules/student/actions';
import { Container, SearchIcon, Content } from './styles';

export default function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.number().required('A idade é obrigatória'),
    weight: Yup.number().required('O peso é obrigatório'),
    height: Yup.number().required('A altura é obrigatória'),
  });

  function handleSubmit() {}

  return (
    <Container>
      <header>
        <strong>Cadastro de aluno</strong>
        <div>
          <button type="button">
            <MdChevronLeft size={20} />
            VOLTAR
          </button>
          <button type="button">
            <MdCheck size={20} />
            SALVAR
          </button>
        </div>
      </header>
      <Form schema={schema} onSubmit={handleSubmit}>
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
            <Input name="age" type="text" />
          </label>
          <label htmlFor="wight">
            PESO (em kg)
            <Input name="wight" type="text" />
          </label>
          <label htmlFor="height">
            ALTURA
            <Input name="height" type="text" />
          </label>
        </div>
      </Form>
    </Container>
  );
}

import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import { Container, Wrapper } from './styles';

export default function Answer({ match, history }) {
  return (
    <Container>
      <Wrapper>
        <header>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço
            uma cachacis que pode alegrar sua vidis. Aenean aliquam molestie
            leo, vitae iaculis nisl. Todo mundo vê os porris que eu tomo, mas
            ninguém vê os tombis que eu levo! Viva Forevis aptent taciti
            sociosqu ad litora torquent.
          </p>
        </header>
        <Form onSubmit={() => {}}>
          <label htmlFor="title">
            SUA RESPOSTA
            <Input multiline name="answer" />
          </label>
          <button type="submit">Responder aluno</button>
        </Form>
      </Wrapper>
    </Container>
  );
}

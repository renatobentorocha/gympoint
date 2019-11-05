import React from 'react';

import { Container } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSignIn(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <form onSubmit={handleSignIn}>
        <img src={logo} alt="GYMPOINT" />

        <label htmlFor="email">
          SEU E-MAIL
          <input name="email" type="email" placeholder="Seu e-mail" />
        </label>

        <label htmlFor="password">
          SUA SENHA
          <input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </Container>
  );
}

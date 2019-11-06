import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo_header from '~/assets/logo_header.png';
import { Container, Content, Logo } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  function handleSignout(e) {
    e.preventDefault();

    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Logo to="/">
          <img src={logo_header} alt="" />
          <span>GYMPOINT</span>
        </Logo>
        <nav>
          <Link to="/">ALUNOS</Link>
          <Link to="/">PLANOS</Link>
          <Link to="/">MATRÍCULAS</Link>
          <Link to="/">PEDIDOS DE AUXÍLIO</Link>
          <Link className="sign_out" to="/" onClick={handleSignout}>
            SAIR
          </Link>
        </nav>
      </Content>
    </Container>
  );
}

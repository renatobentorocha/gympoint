import React from 'react';
import { Link } from 'react-router-dom';
import logo_header from '~/assets/logo_header.png';
import { Container, Content, Logo } from './styles';

export default function Header() {
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
        </nav>
      </Content>
    </Container>
  );
}

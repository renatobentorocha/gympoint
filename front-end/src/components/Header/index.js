import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo_header from '~/assets/logo_header.png';
import { Container, Content, Logo } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
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
          <ul>
            <li>
              <Link tabIndex="-1" to="/alunos">
                ALUNOS
              </Link>
            </li>
            <li>
              <Link tabIndex="-2" to="/planos">
                PLANOS
              </Link>
            </li>
            <li>
              <Link tabIndex="-3" to="/">
                MATRÍCULAS
              </Link>
            </li>
            <li>
              <Link tabIndex="-4" to="/">
                PEDIDOS DE AUXÍLIO
              </Link>
            </li>
          </ul>
        </nav>
        <Link className="sign_out" to="/" onClick={handleSignout}>
          <strong>{profile.name}</strong>
          <span>sair do sistema</span>
        </Link>
      </Content>
    </Container>
  );
}

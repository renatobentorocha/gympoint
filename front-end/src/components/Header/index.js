import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo_header from '~/assets/logo_header.png';
import { Wrapper, Container, Content, Logo } from './styles';

export default function Header({ location }) {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignout(e) {
    e.preventDefault();

    dispatch(signOut());
  }

  function marker(resource) {
    return location.pathname.includes(resource) ? { color: '#444' } : null;
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
              <Link to="/alunos" style={marker('alunos')}>
                ALUNOS
              </Link>
            </li>
            <li>
              <Link to="/planos" style={marker('planos')}>
                PLANOS
              </Link>
            </li>
            <li>
              <Link to="/matriculas" style={marker('matriculas')}>
                MATRÍCULAS
              </Link>
            </li>
            <li>
              <Link to="/auxilios" style={marker('auxilios')}>
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

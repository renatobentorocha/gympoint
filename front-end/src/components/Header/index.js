import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';

import { signOut } from '~/store/modules/auth/actions';

import logo_header from '~/assets/logo_header.png';
import { Container, Content, Logo, SignOut } from './styles';

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
        <div className="hambuger_container">
          <div>
            <GiHamburgerMenu color="#ee4d64" size={40} />
          </div>
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
        </div>
        <SignOut className="sign_out" to="/" onClick={handleSignout}>
          <strong>{profile && profile.name}</strong>
          <span>sair do sistema</span>
        </SignOut>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

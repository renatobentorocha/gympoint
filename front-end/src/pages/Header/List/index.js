import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/components/Button';

import { Container } from './styles';

function Header({ title, handleRegister, children }) {
  return (
    <Container>
      <strong>{title}</strong>
      <div>
        {handleRegister ? (
          <Button icon="MdAdd" title="CADASTRAR" onClick={handleRegister} />
        ) : null}
        {children}
      </div>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleRegister: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Header.defaultProps = {
  children: null,
  handleRegister: null,
};
export default Header;

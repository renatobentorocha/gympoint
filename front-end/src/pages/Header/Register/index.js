import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from './styles';

function Header({ form_id, title, loading, history }) {
  function handleBack() {
    history.goBack();
  }

  return (
    <Container>
      <strong>{title}</strong>
      <div>
        <Button icon="MdChevronLeft" title="VOLTAR" onClick={handleBack} />
        <Button
          type="submit"
          icon="MdCheck"
          loading={loading}
          title="SALVAR"
          form={form_id}
        />
      </div>
    </Container>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  form_id: PropTypes.string.isRequired,
};

Header.defaultProps = {
  loading: false,
};

export default Header;

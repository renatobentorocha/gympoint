import React from 'react';
import PropTypes from 'prop-types';
import LoadIndicator from '~/components/LoadIndicator';

import { Container, Buttton, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container>
      <Buttton {...rest}>
        {loading ? (
          <LoadIndicator size="small" color="#FFF" />
        ) : (
          <Text>{children}</Text>
        )}
      </Buttton>
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

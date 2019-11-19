import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Buttton, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container>
      <Buttton {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
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
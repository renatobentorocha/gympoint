import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function LoadIndicator({ size, color }) {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}

LoadIndicator.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

LoadIndicator.defaultProps = {
  size: 'large',
  color: '#ee4e62',
};

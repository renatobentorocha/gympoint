import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Table({ children }) {
  return <Container>{children}</Container>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

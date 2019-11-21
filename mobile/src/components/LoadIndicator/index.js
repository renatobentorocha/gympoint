import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function LoadIndicator({ size = 'large', color = '#ee4e62' }) {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}

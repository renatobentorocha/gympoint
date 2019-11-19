import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import logoLeftHeader from '~/assets/logo_left_header.png';
import logoRightHeader from '~/assets/logo_rigth_header.png';

export default function Header() {
  return (
    <Container>
      <Image source={logoLeftHeader} />
      <Image source={logoRightHeader} style={{ left: -8 }} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}

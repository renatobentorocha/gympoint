import React from 'react';
import Button from '~/components/Button';
import logoLeft from '~/assets/logo_left.png';
import logoRigth from '~/assets/logo_rigth.png';

import { Container, LogoWrapper, Logo, Tiltle, InputText } from './styles';

export default function SignIn() {
  return (
    <Container>
      <LogoWrapper>
        <Logo source={logoLeft} style={{ marginLeft: 20 }} />
        <Logo source={logoRigth} style={{ left: -20 }} />
      </LogoWrapper>
      <Tiltle>GYMPOINT</Tiltle>
      <InputText
        placeholder="Informe o ID de cadastro"
        placeholderTextColor="#999"
      />
      <Button>Entrar no sistema</Button>
    </Container>
  );
}

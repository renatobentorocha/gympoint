import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
import Button from '~/components/Button';
import logoLeft from '~/assets/logo_left.png';
import logoRigth from '~/assets/logo_rigth.png';

import { Container, LogoWrapper, Logo, Tiltle, InputText } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  function handleSignIn() {
    dispatch(signInRequest(id));
  }

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
        keyboardType="numeric"
        autoCorrect={false}
        returnKeyType="send"
        value={id}
        onChangeText={setId}
      />
      <Button onPress={handleSignIn}>Entrar no sistema</Button>
    </Container>
  );
}

import React from 'react';
import Button from '~/components/Button';

import { Container, TextInput } from './styles';

export default function Assistance() {
  return (
    <Container>
      <TextInput
        multiline
        textAlignVertical="top"
        placeholder="Inclua seu pedido de auxílio"
      />
      <Button>Enviar pedido</Button>
    </Container>
  );
}

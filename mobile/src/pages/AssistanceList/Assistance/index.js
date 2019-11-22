import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';

import { assitanceRequest } from '~/store/modules/assistance/actions';

import { Container, TextInput } from './styles';

export default function Assistance() {
  const dispacth = useDispatch();
  const [question, setQuestion] = useState('');

  const loading = useSelector(state => state.assistance.loading);

  function handleAssistandeRequest() {
    dispacth(assitanceRequest(1, question));
  }

  return (
    <Container>
      <TextInput
        multiline
        textAlignVertical="top"
        placeholder="Inclua seu pedido de auxílio"
        value={question}
        onChangeText={setQuestion}
      />
      <Button loading={loading} onPress={handleAssistandeRequest}>
        Enviar pedido
      </Button>
    </Container>
  );
}

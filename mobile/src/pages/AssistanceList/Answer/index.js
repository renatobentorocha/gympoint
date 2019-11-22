import React from 'react';

import { Container, ScrollView, QuestionHeader, Text, Content } from './styles';

export default function Answer() {
  return (
    <Container>
      <ScrollView>
        <QuestionHeader>
          <Text>PERGUNTA</Text>
          <Text>Hoje às 14h</Text>
        </QuestionHeader>
        <Content>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </Content>
        <Text>RESPOSTA</Text>
        <Content>
          Opa, isso aí, duas em duas horas, não deixa pra depois, um monstro
          treina como um, come como dois. Opa, isso aí, duas em duas horas, não
          deixa pra depois, um monstro treina como um, come como dois.
        </Content>
      </ScrollView>
    </Container>
  );
}

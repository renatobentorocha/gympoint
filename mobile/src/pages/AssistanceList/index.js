import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import {
  Container,
  List,
  AnswerWrapper,
  AnswerHeader,
  StatusWrapper,
  Status,
  AnswerAt,
  Answer,
} from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    answered: false,
    label: 'Sem resposta',
    answerAt: 'Hoje às 14h',
    answer:
      'Mussum Ipsum, cacilds vidis litro abertis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Suco de cevadiss deixa as pessoas mais interessantis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Delegadis gente finis, bibendum egestas augue arcu ut est.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    answered: true,
    label: 'Respondido',
    answerAt: 'Hoje às 14h',
    answer:
      'Mussum Ipsum, cacilds vidis litro abertis. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Suco de cevadiss deixa as pessoas mais interessantis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Delegadis gente finis, bibendum egestas augue arcu ut est.',
  },
];

export default function AssistanceList({ navigation }) {
  function HandleAssistanceRequest() {
    navigation.navigate('Assistance');
  }

  return (
    <Container>
      <Button onPress={HandleAssistanceRequest}>Novo pedido de auxílio</Button>
      <List
        showsVerticalScrollIndicator={false}
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AnswerWrapper>
            <AnswerHeader>
              <StatusWrapper>
                <Icon
                  name="check-circle"
                  size={30}
                  color={item.answered ? '#42cb59' : '#999'}
                />
                <Status style={{ color: item.answered ? '#42cb59' : '#999' }}>
                  {item.label}
                </Status>
              </StatusWrapper>
              <AnswerAt>{item.answerAt}</AnswerAt>
            </AnswerHeader>
            <Answer>
              <Text>{item.answer}</Text>
            </Answer>
          </AnswerWrapper>
        )}
      />
    </Container>
  );
}

AssistanceList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { distanceToNow } from '~/util/dateFormat';
import api from '~/services/api';
import {
  Container,
  ScrollView,
  QuestionHeader,
  Text,
  Date,
  Content,
} from './styles';

export default function Answer({ navigation }) {
  const [answer, setAnswer] = useState(null);
  const student = useSelector(state => state.student.data);

  useEffect(() => {
    async function loadAnswer() {
      try {
        const id = navigation.getParam('id', null);

        const response = await api.get(
          `students/${student.id}/help_orders/${id}`
        );

        const data = {
          question: response.data.question,
          createdAt: distanceToNow(response.data.createdAt),
          answer_at: distanceToNow(response.data.answer_at),
          value: response.data.answer,
        };

        setAnswer(data);
      } catch (error) {
        Alert.alert('Erro a carregar a resposta');
      }
    }

    loadAnswer();
  }, [navigation, student]);

  return answer ? (
    <Container>
      <ScrollView>
        <QuestionHeader>
          <Text>PERGUNTA</Text>
          <Date>{answer.createdAt}</Date>
        </QuestionHeader>
        <Content>{answer.question}</Content>
        <QuestionHeader>
          <Text>RESPOSTA</Text>
          <Date>{answer.answer_at}</Date>
        </QuestionHeader>
        <Content>{answer.value}</Content>
      </ScrollView>
    </Container>
  ) : null;
}

Answer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

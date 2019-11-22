import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';
import LoadIndicator from '~/components/LoadIndicator';

import { loadAssitancesRequest } from '~/store/modules/assistance/actions';

import {
  Container,
  List,
  QuestionButtonWrapper,
  QuestionWrapper,
  QuestionHeader,
  StatusWrapper,
  Status,
  AnswerAt,
  Question,
} from './styles';

export default function AssistanceList({ navigation }) {
  const { data, loading } = useSelector(state => ({
    data: state.assistance.data,
    loading: state.assistance.loading,
  }));

  const dispatch = useDispatch();

  const loadAssistances = useCallback(() => {
    dispatch(loadAssitancesRequest(1));
  }, [dispatch]);

  useEffect(() => {
    loadAssistances();
  }, [loadAssistances]);

  function HandleAssistanceRequest() {
    navigation.navigate('Assistance');
  }

  function questionContent(item) {
    return (
      <>
        <QuestionHeader>
          <StatusWrapper>
            <Icon
              name="check-circle"
              size={16}
              color={item.answered ? '#42cb59' : '#999'}
            />
            <Status style={{ color: item.answered ? '#42cb59' : '#999' }}>
              {item.label}
            </Status>
          </StatusWrapper>
          <AnswerAt>{item.answerAt}</AnswerAt>
        </QuestionHeader>
        <Question>
          <Text>{item.question}</Text>
        </Question>
      </>
    );
  }

  function handleAnsweredQuestion(id) {
    navigation.navigate('Answer', { id });
  }

  function questionWrapper(item) {
    return item.answered ? (
      <QuestionButtonWrapper onPress={handleAnsweredQuestion}>
        {questionContent(item)}
      </QuestionButtonWrapper>
    ) : (
      <QuestionWrapper>{questionContent(item)}</QuestionWrapper>
    );
  }

  return (
    <Container>
      <Button onPress={HandleAssistanceRequest}>Novo pedido de auxílio</Button>
      {loading ? (
        <LoadIndicator />
      ) : (
        <List
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (item ? questionWrapper(item) : null)}
        />
      )}
    </Container>
  );
}

AssistanceList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

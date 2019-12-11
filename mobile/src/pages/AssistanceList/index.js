import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';
import LoadIndicator from '~/components/LoadIndicator';

import {
  loadAssitancesRequest,
  clearAssitanceRequest,
} from '~/store/modules/assistance/actions';

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

function AssistanceList({ navigation, isFocused }) {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, student } = useSelector(state => ({
    data: state.assistance.data,
    loading: state.assistance.loading,
    student: state.student.data,
  }));

  const dispatch = useDispatch();

  const loadAssistances = useCallback(() => {
    if (student) {
      dispatch(loadAssitancesRequest(student.id, page));
    }
  }, [dispatch, page, student]);

  useEffect(() => {
    if (isFocused) {
      loadAssistances();
    } else {
      setPage(1);
    }
  }, [dispatch, isFocused, loadAssistances, page]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(loading);
    }
  }, [loading]);

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
      <QuestionButtonWrapper onPress={() => handleAnsweredQuestion(item.id)}>
        {questionContent(item)}
      </QuestionButtonWrapper>
    ) : (
      <QuestionWrapper>{questionContent(item)}</QuestionWrapper>
    );
  }

  function renderFooter() {
    return loading ? <LoadIndicator /> : null;
  }

  function handleRefresh() {
    if (page !== 1) {
      setRefreshing(true);
      setPage(1);
    }
  }

  return (
    <Container>
      <Button onPress={HandleAssistanceRequest}>Novo pedido de auxílio</Button>
      {data.length === 0 ? (
        renderFooter()
      ) : (
        <List
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (item ? questionWrapper(item) : null)}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </Container>
  );
}

AssistanceList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(AssistanceList);

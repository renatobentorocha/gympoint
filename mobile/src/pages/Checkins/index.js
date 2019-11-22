import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

import Button from '~/components/Button';
import LoadIndicator from '~/components/LoadIndicator';

import {
  loadCheckInsRequest,
  checkInRequest,
} from '~/store/modules/checkin/actions';

import {
  Container,
  List,
  CheckinWrapper,
  CheckinId,
  CheckinDate,
} from './styles';

export default function Checkins() {
  const dispatch = useDispatch();

  const { data, loading, student } = useSelector(state => ({
    data: state.checkin.data,
    loading: state.checkin.loading,
    student: state.student.data,
  }));

  const loadCheckIns = useCallback(() => {
    if (student) {
      dispatch(loadCheckInsRequest(student.id));
    }
  }, [dispatch, student]);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns]);

  function handleCheckInRequest() {
    dispatch(checkInRequest(student.id));
  }

  return (
    <Container>
      <Button loading={loading} onPress={handleCheckInRequest}>
        Novo check-in
      </Button>

      {loading ? (
        <LoadIndicator />
      ) : (
        <List
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <CheckinWrapper>
              <View>
                <CheckinId>Check-in #{item.id}</CheckinId>
              </View>
              <CheckinDate>{item.date}</CheckinDate>
            </CheckinWrapper>
          )}
        />
      )}
    </Container>
  );
}

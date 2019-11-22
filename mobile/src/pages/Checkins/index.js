import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

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

function Checkins({ isFocused }) {
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
    if (isFocused) {
      loadCheckIns();
    }
  }, [isFocused, loadCheckIns]);

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

Checkins.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkins);

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import LoadIndicator from '~/components/LoadIndicator';

import {
  loadCheckInsRequest,
  checkInRequest,
  clearCheckInRequest,
} from '~/store/modules/checkin/actions';

import {
  Container,
  List,
  CheckinWrapper,
  CheckinId,
  CheckinDate,
} from './styles';

function Checkins({ isFocused }) {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { data, loading, loadingAddRequest, student } = useSelector(state => ({
    data: state.checkin.data,
    loading: state.checkin.loading,
    loadingAddRequest: state.checkin.loadingAddRequest,
    student: state.student.data,
  }));

  const loadCheckIns = useCallback(() => {
    if (student) {
      dispatch(loadCheckInsRequest(student.id, page));
    }
  }, [dispatch, page, student]);

  useEffect(() => {
    if (isFocused) {
      loadCheckIns();
    } else {
      dispatch(clearCheckInRequest());
    }
  }, [dispatch, isFocused, loadCheckIns, page]);

  function handleCheckInRequest() {
    dispatch(checkInRequest(student.id));
  }

  function renderFooter() {
    return loading ? <LoadIndicator /> : null;
  }

  return (
    <Container>
      <Button loading={loadingAddRequest} onPress={handleCheckInRequest}>
        Novo check-in
      </Button>

      {data.length === 0 ? (
        renderFooter()
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
          onEndReached={() => setPage(page + 1)}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
        />
      )}
    </Container>
  );
}

Checkins.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkins);

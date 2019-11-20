import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import Button from '~/components/Button';

import { loadCheckInsRequest } from '~/store/modules/checkin/actions';

import {
  Container,
  List,
  CheckinWrapper,
  CheckinId,
  CheckinDate,
} from './styles';

// const data = [
//   {
//     id: '7',
//     date: 'Hoje às 14h',
//   },
//   {
//     id: '6',
//     date: 'Ontem às 20h',
//   },
//   {
//     id: '5',
//     date: 'Ontem às 20h',
//   },
//   {
//     id: '4',
//     date: 'Ontem às 20h',
//   },
//   {
//     id: '3',
//     date: 'Ontem às 20h',
//   },
//   {
//     id: '2',
//     date: 'Ontem às 20h',
//   },
//   {
//     id: '1',
//     date: 'Ontem às 20h',
//   },
// ];

export default function Checkins() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.checkin.data);

  const loadCheckIns = useCallback(() => {
    dispatch(loadCheckInsRequest(1));
  }, [dispatch]);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns]);

  return (
    <Container>
      <Button>Novo check-in</Button>
      <List
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CheckinWrapper>
            <View>
              <CheckinId>Check-in #{item.id}</CheckinId>
            </View>
            <CheckinDate>{item.date}</CheckinDate>
          </CheckinWrapper>
        )}
      />
    </Container>
  );
}

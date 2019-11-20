import React from 'react';
import { View } from 'react-native';
import Button from '~/components/Button';

import {
  Container,
  List,
  CheckinWrapper,
  CheckinId,
  CheckinDate,
} from './styles';

const DATA = [
  {
    id: '7',
    date: 'Hoje às 14h',
  },
  {
    id: '6',
    date: 'Ontem às 20h',
  },
  {
    id: '5',
    date: 'Ontem às 20h',
  },
  {
    id: '4',
    date: 'Ontem às 20h',
  },
  {
    id: '3',
    date: 'Ontem às 20h',
  },
  {
    id: '2',
    date: 'Ontem às 20h',
  },
  {
    id: '1',
    date: 'Ontem às 20h',
  },
];

export default function Checkins() {
  return (
    <Container>
      <Button>Novo check-in</Button>
      <List
        showsVerticalScrollIndicator={false}
        data={DATA}
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

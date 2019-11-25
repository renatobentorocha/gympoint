import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px 20px 20px;
  background-color: #f5f5f5;
`;

export const List = styled.FlatList.attrs({})`
  margin-top: 20px;
  width: 100%;
`;

export const CheckinWrapper = styled.View`
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const CheckinId = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  color: #444444;
  text-align: left;
`;

export const CheckinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

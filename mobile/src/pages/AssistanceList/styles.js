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

export const AnswerWrapper = styled.View.attrs({})`
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px;
`;

export const AnswerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StatusWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Status = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  text-align: left;
`;

export const AnswerAt = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const Answer = styled.Text`
  margin-top: 16px;
  font-family: 'Roboto';
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
`;

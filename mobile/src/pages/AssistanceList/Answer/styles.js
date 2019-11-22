import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ScrollView = styled.ScrollView`
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  padding: 0 20px;
`;

export const QuestionHeader = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  color: #444444;
`;

export const Content = styled.Text`
  margin: 20px 0;
  font-family: 'Roboto';
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
`;

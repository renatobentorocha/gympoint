import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 20px 20px 20px;
  background-color: #f5f5f5;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  height: 300px;
  font-family: 'Roboto';
  font-size: 16px;
  color: #999999;
  text-align: left;
  border: 1px solid #ddd;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

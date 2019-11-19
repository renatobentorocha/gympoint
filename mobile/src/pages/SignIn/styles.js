import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled.View`
  flex-direction: row;
`;

export const Logo = styled.Image`
  width: 50;
  height: 42;
`;

export const Tiltle = styled.Text`
  font-family: 'Roboto';
  font-size: 23.89px;
  color: #ee4d64;
  text-align: left;
  font-weight: bold;
`;

export const InputText = styled(Input)`
  border: 1px solid #ddd;
  margin: 25px 15px 15px 15px;
`;

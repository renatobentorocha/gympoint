import styled from 'styled-components';
import { darken } from 'polished';
import TButton from '~/components/Button';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  strong {
    font-size: 24px;
    color: #444444;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }

  button:hover {
    background-color: ${darken(0.1, '#ccc')};
  }

  button + button {
    margin-left: 15px;
    background-color: #ee4d64;
  }

  button + button:hover {
    background-color: ${darken(0.1, '#ee4d64')};
  }
`;

export const Button = styled(TButton)`
  width: 110px;
  background-color: #ccc;
  transition: background-color 1s;

  svg {
    margin-right: 15px;
  }
`;

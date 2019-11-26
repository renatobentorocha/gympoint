import styled, { keyframes } from 'styled-components';
import { MdRotateRight } from 'react-icons/md';

export const Container = styled.div``;

export const TButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 140px;
  border-radius: 4px;
  background-color: #ee4d64;
  font-weight: bold;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(MdRotateRight).attrs({
  size: 20,
  color: '#fff',
})`
  animation: ${rotate} 2s linear infinite;
`;

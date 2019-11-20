import styled, { keyframes } from 'styled-components';
import { MdRotateRight } from 'react-icons/md';

export const Container = styled.div`
  height: 100%;
  min-height: 450px;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 360px;
    height: 100%;
    max-height: 450px;
    text-align: center;
    background-color: #fff;

    border-radius: 4px;
  }

  img {
    width: 120px;
    margin-bottom: 40px;
  }

  label {
    text-align: start;
    color: #444444;
    font-weight: bold;

    input + span {
      display: block;
      color: #ee4d64;
      margin-bottom: 15px;
    }
  }

  input {
    display: block;
    width: 300px;
    height: 44px;

    margin-bottom: 20px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;

    font-size: 16px;
    color: #999999;

    padding-left: 15px;
  }

  input::placeholder {
    color: #999999;
  }

  button {
    width: 300px;
    height: 44px;

    font-size: 16px;
    font-weight: bold;

    background-color: #ee4d64;
    border-radius: 4px;
  }
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
  size: 25,
  color: '#fff',
})`
  animation: ${rotate} 2s linear infinite;
`;

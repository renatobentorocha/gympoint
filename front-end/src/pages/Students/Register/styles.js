import styled, { keyframes } from 'styled-components';
import { MdRotateRight } from 'react-icons/md';
import { darken } from 'polished';

export const Container = styled.div`
  min-width: 900px;
  max-width: 900px;
  margin: 30px auto 0 auto;

  header {
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

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 35px;
      width: 110px;
      border-radius: 4px;
      background-color: #ccc;
      transition: background-color 1s;
      font-weight: bold;

      svg {
        margin-right: 15px;
      }
    }

    button:hover {
      background-color: ${darken(0.1, '#ccc')};
    }

    button + button {
      margin-left: 15px;
      font-weight: bold;
      background-color: #ee4d64;
    }

    button + button:hover {
      background-color: ${darken(0.1, '#ee4d64')};
    }

    strong + button:hover {
      background-color: ${darken(0.3, '#ccc')};
    }

    input::placeholder {
      color: #999999;
    }
  }

  form {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    background-color: #fff;

    border-radius: 4px;

    input {
      display: block;
      width: 100%;
      height: 44px;

      margin-bottom: 20px;
      margin-top: 10px;
      border-radius: 4px;

      border: 1px solid #ddd;

      font-size: 16px;
      color: #999999;

      padding-left: 15px;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;

      label:nth-child(-n + 2) {
        margin-right: 15px;
      }
    }
  }

  label {
    width: 100%;
    text-align: start;
    color: #444444;
    font-weight: bold;

    input + span {
      display: block;
      color: #ee4d64;
      margin-bottom: 15px;
    }
  }

  input::placeholder {
    color: #999999;
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
  size: 20,
  color: '#fff',
})`
  animation: ${rotate} 2s linear infinite;
`;

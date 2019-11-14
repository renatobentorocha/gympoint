import styled, { keyframes } from 'styled-components';
import { MdRotateRight } from 'react-icons/md';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  min-width: 450px;
  max-width: 450px;
  border-radius: 4px;
  padding: 30px;

  margin: 0 auto;
  background-color: #fff;
  text-align: left;

  header {
    margin-bottom: 30px;

    strong {
      color: #444444;
      font-weight: bold;
    }

    p {
      margin-top: 15px;
      font-size: 16px;
      color: #666666;
      line-height: 26px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      color: #444444;
    }

    textarea {
      margin: 15px 0 20px 0;
      display: block;
      width: 100%;
      font-size: 16px;
      color: #999999;

      border-radius: 4px;
      resize: none;
      height: 125px;
      border: solid 1px #ddd;
    }

    button {
      height: 44px;
      background-color: #ee4d64;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
      transition: background-color 1s;
    }

    button:hover {
      background-color: ${darken(0.1, '#ee4d64')};
    }

    textarea + span {
      display: block;
      color: #ee4d64;
      margin-bottom: 15px;
    }
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

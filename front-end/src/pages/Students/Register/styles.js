import styled from 'styled-components';
import { MdCheckCircle, MdSearch } from 'react-icons/md';

export const Container = styled.div`
  width: 100%;

  margin-top: 30px;
  padding: 0 270px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    strong {
      font-family: Roboto, sans-serif;
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
      background-color: #ee4d64;

      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;

      svg {
        margin-right: 15px;
      }
    }

    button + button {
      margin-left: 15px;

      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
      background-color: #ccc;
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

    width: 100%;

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

      font-family: Roboto, sans-serif;
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
    font-size: 14px;
    color: #444444;
    font-family: Roboto, sans-serif;
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

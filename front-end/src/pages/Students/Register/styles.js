import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto 0;

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

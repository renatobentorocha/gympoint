import styled from 'styled-components';

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
    font-size: 14px;
    color: #444444;
    font-family: Roboto, sans-serif;
    font-weight: bold;
  }

  input {
    display: block;
    width: 300px;
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

  button {
    width: 300px;
    height: 44px;

    font-family: Roboto;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;

    background-color: #ee4d64;
    border-radius: 4px;
  }
`;

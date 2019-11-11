import styled, { keyframes } from 'styled-components';
import { MdRotateRight, MdKeyboardArrowDown } from 'react-icons/md';
import { darken } from 'polished';
import AsyncSelect from 'react-select/async';
import ReactSelect from '~/components/Unform/ReactSelect';
import DatePicker from '~/components/Unform/DatePicker';
import { customStyles } from '~/styles/ReactSelect';

export const TAsyncSelect = styled(AsyncSelect).attrs({
  styles: customStyles,
})`
  position: relative;
  font-weight: normal;

  > div:first-of-type {
    border: 1px solid #ddd;
    height: 100%;
    padding-left: 20px;
  }
`;

export const TReactSelect = styled(ReactSelect)`
  font-weight: normal;

  > div:first-of-type {
    border: 1px solid #ddd;
    height: 100%;
    padding-left: 20px;
  }
`;

export const TDatePicker = styled(DatePicker).attrs({})`
  border: 1px solid #ddd;
`;

export const TMdArrowDropDown = styled(MdKeyboardArrowDown).attrs({
  size: 20,
  color: '#cccccc',
})`
  position: absolute;
  top: 42%;
  right: 12px;

  pointer-events: none;
`;

export const Container = styled.div`
  margin-top: 30px;
  padding: 0 170px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    min-width: 900px;

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
      background-color: #ccc;
      transition: background-color 1s;

      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #ffffff;
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
      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
      background-color: #ee4d64;
    }

    header button + button:hover {
      background-color: ${darken(0.1, '#ee4d64')};
    }

    header strong + button:hover {
      background-color: ${darken(0.3, '#ccc')};
    }
  }

  form {
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      .data-picker-arrow {
        background-color: transparent;
      }

      .react-datepicker__input-container > input {
        padding-left: 30px;
      }
    }

    label > input,
    .react-datepicker__input-container > input,
    label > div > input {
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

      padding-left: 20px;
    }

    label:nth-child(-n + 3) {
      margin-right: 15px;
    }
  }

  label {
    position: relative;
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

    div :hover {
      cursor: pointer;
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

export const FormWrapper = styled.div`
  min-width: 900px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
`;

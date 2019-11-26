import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { darken } from 'polished';
import AsyncReactSelect from '~/components/Unform/AsyncReactSelect';
import ReactSelect from '~/components/Unform/ReactSelect';
import DatePicker from '~/components/Unform/DatePicker';
import { customStyles } from '~/styles/ReactSelect';
import TButton from '~/components/Button';

export const TAsyncSelect = styled(AsyncReactSelect).attrs({
  styles: customStyles,
})`
  position: relative;
  font-weight: normal;
  width: 100%;

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
  top: 36%;
  right: 12px;

  pointer-events: none;
`;

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
      display: block;
      font-size: 24px;
      color: #444444;
      font-weight: bold;
    }

    div {
      display: flex;
      align-items: center;
    }

    button + button {
      margin-left: 15px;
      background-color: #ee4d64;
    }

    button:hover {
      background-color: ${darken(0.3, '#ccc')};
    }

    button + button:hover {
      background-color: ${darken(0.1, '#ee4d64')};
    }
  }

  form {
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;

    > div > span {
      margin-bottom: 15px;
    }

    span {
      display: block;
      color: #ee4d64;
      font-weight: bold;
    }

    > div:nth-child(2) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

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

    color: #444444;

    font-weight: bold;
    height: 106px;

    div :hover {
      cursor: pointer;
    }
  }

  input::placeholder {
    color: #999999;
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

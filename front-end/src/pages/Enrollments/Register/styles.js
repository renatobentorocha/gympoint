import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import AsyncReactSelect from '~/components/Unform/AsyncReactSelect';
import ReactSelect from '~/components/Unform/ReactSelect';
import DatePicker from '~/components/Unform/DatePicker';
import { customStyles } from '~/styles/ReactSelect';

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
  max-width: 900px;
  margin: 30px auto 0;

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
      white-space: pre;

      .react-datepicker-wrapper {
        width: 100%;
      }
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

    @media screen and (max-width: 742px) {
      > div:nth-child(2) {
        flex-wrap: wrap;
        margin: 0;
      }

      label:nth-child(-n + 3) {
        margin-right: 0;
      }
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

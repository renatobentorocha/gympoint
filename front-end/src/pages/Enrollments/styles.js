import styled from 'styled-components';
import { MdCheckCircle, MdSearch } from 'react-icons/md';

export const Container = styled.div`
  min-width: 1100px;
  margin: 30px 30px 0 30px;

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

    button + div {
      position: relative;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 35px;
      width: 140px;
      border-radius: 4px;
      background-color: #ee4d64;

      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;
    }

    input {
      margin-left: 15px;
      padding-left: 40px;

      height: 35px;
      width: 235px;

      border-radius: 4px;
      border: 1px solid #ddd;

      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #999999;
    }

    input::placeholder {
      color: #999999;
    }
  }
`;

export const SearchIcon = styled(MdSearch).attrs({
  size: 16,
  color: '#999999',
})`
  position: absolute;
  left: 30px;
`;

export const CheckIcon = styled(MdCheckCircle).attrs({
  size: 20,
  color: '#42cb59;',
})``;

export const Content = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: center;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      color: #444444;
    }

    tr:last-child {
      border-bottom: 0;
    }

    th:first-child {
      text-align: left;
    }

    tr td:first-child {
      text-align: left;
    }

    tr td {
      padding: 20px 0 20px 0;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      color: #666666;
      line-height: 20px;
      text-align: center;
      vertical-align: top;
    }

    tr {
      border-bottom: 1px solid #ddd;
    }

    tr td a {
      font-family: Roboto, sans-serif;
      font-size: 15px;
      color: #4d85ee;
    }

    tr td a:last-child {
      margin-left: 23px;
      color: #de3b3b;
    }
  }
`;

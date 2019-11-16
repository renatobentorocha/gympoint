import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.section`
  display: flex;
  align-items: center;

  .pagination {
    display: flex;
    align-items: center;
    background-color: #de3b3b;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;

    > li {
      display: inline-block;
      padding: 15px;
      margin-left: 15px;
      transition: background-color 1s;
    }

    > li:first-child {
      margin-left: 0;
    }

    > li:hover {
      background-color: ${darken(0.1, '#ee4d64')};
      cursor: pointer;
    }

    > .active_page {
      background-color: ${darken(0.3, '#ee4d64')};
      cursor: pointer;
    }
  }

  > div {
    margin-left: 40px;

    span {
      display: inline-block;
      font-size: 16px;
      color: #666666;
      margin-right: 5px;
      font-weight: bold;
    }

    input {
      display: inline-block;
      height: 35px;
      width: 75px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
`;

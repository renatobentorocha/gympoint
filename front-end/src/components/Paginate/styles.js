import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;

  .pagination {
    display: flex;
    align-items: center;
    background-color: #de3b3b;
    border-radius: 4px;
    font-weight: bold;
    font-size: 16px;

    > li {
      display: inline-block;
      padding: 15px;
      transition: background-color 1s;
    }

    > li:first-child {
      margin-left: 0;
    }

    > li:hover {
      background-color: ${darken(0.1, '#ee4d64')};
      cursor: pointer;
    }

    > li > a {
      padding: 10px;
    }

    > .active_page {
      background-color: ${darken(0.3, '#ee4d64')};
      cursor: pointer;
    }

    @media screen and (max-width: 720px) {
      > li {
        display: none;
      }

      > li:first-child {
        display: inline-block;
      }

      > li:last-child {
        display: inline-block;
      }
    }
  }

  > div {
    margin-left: 40px;

    span {
      display: inline-block;
      font-size: 13px;
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
      color: #999999;
      text-align: center;
    }
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;

    > div {
      margin-left: 0;
      margin-top: 15px;
    }

    .next::after {
      content: '(${props => `${props.forcePage}/${props.pageCount}`})';
    }
  }
`;

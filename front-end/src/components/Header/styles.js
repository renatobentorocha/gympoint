import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  background-color: #fff;
`;

export const Content = styled.div`
  padding-left: 30px;
  height: 65px;

  display: flex;
  align-items: center;

  nav {
    min-width: 700px;
    padding-left: 30px;

    ul > li {
      display: inline-block;
    }

    ul {
      width: 100%;

      li + li {
        margin-left: 30px;
      }

      li > a {
        font-family: Roboto;
        font-size: 15px;
        color: #999999;
        font-weight: bold;
        transition: color 1s;
      }

      li > a:hover {
        color: ${darken(0.1, '#999999')};
      }

      a[tabindex]:focus {
        color: #444444;
      }
    }
  }

  > nav + a {
    justify-self: flex-end;
    margin-left: auto;
    padding-right: 30px;

    strong {
      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #666666;
    }

    span {
      margin-top: 4px;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      color: #de3b3b;
      display: block;
      text-align: right;
      transition: color 1s;
      white-space: pre;
    }
  }

  > nav + a > span:hover {
    color: ${darken(0.2, '#de3b3b')};
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  border-right: 1px solid #dddddd;
  padding-right: 30px;

  span {
    font-family: Roboto;
    font-size: 15px;
    color: #ee4d64;
    font-weight: bold;
  }
`;

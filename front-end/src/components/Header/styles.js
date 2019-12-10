import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  background-color: #fff;
  max-width: 1300px;
  margin: 0 auto;
`;

export const Content = styled.div`
  height: 65px;
  display: flex;
  align-items: center;

  .hambuger_container svg {
    display: none;
  }

  @media screen and (max-width: 776px) {
    & {
      position: relative;
      justify-content: space-between;
    }

    .hambuger_container svg {
      display: block;
    }

    nav,
    .sign_out {
      display: none;
    }

    .hambuger_container:hover > div + nav {
      background-color: rgba(238, 77, 100, 1);
      z-index: 1;
      display: block;
      position: absolute;

      padding: 0;

      top: 50px;
      right: 0px;

      ul > li {
        display: block;
        margin: 0;
      }

      ul > li > a {
        display: block;
        padding: 20px;
      }
    }
  }

  nav {
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
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  border-right: 1px solid #dddddd;
  padding-right: 30px;

  span {
    font-size: 15px;
    color: #ee4d64;
    font-weight: bold;
  }
`;

export const SignOut = styled(Link)`
  justify-self: flex-end;
  margin-left: auto;

  strong {
    color: #666666;
  }

  span {
    margin-top: 4px;
    color: #de3b3b;
    display: block;
    text-align: right;
    transition: font-weight 1s, color 1s;
    white-space: pre;
  }

  span:hover {
    color: ${darken(0.2, '#de3b3b')};
    font-weight: bold;
  }
`;

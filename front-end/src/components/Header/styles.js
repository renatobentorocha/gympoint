import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  min-width: 770px;
  background-color: #fff;
`;

export const Content = styled.div`
  padding-left: 30px;
  height: 65px;

  display: flex;
  align-items: center;

  nav ul li:last-child {
    padding-right: 30px;
    float: right;
  }

  nav ul li:last-child a {
    color: #ee4d64;
    transition: color 1s;
  }

  nav ul li:last-child :hover {
    color: ${darken(0.2, '#ee4d64')};
  }

  nav {
    width: 100%;
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
    font-family: Roboto;
    font-size: 15px;
    color: #ee4d64;
    font-weight: bold;
  }
`;

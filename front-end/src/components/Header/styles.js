import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-width: 710px;
  background-color: #fff;
`;

export const Content = styled.div`
  padding-left: 30px;
  height: 65px;

  display: flex;
  align-items: center;

  nav {
    padding-left: 30px;

    a + a {
      margin-left: 30px;
    }
  }

  a {
    font-family: Roboto;
    font-size: 15px;
    color: #999999;
    text-align: left;
    font-weight: bold;
  }

  a:hover {
    color: #444444;
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

import styled from 'styled-components';
import { MdCheckCircle, MdSearch } from 'react-icons/md';

export const Container = styled.div`
  min-width: 800px;
  max-width: 1200px;
  margin: 30px auto 0 auto;

  header {
    input {
      margin-left: 15px;
      padding-left: 40px;

      height: 35px;
      width: 235px;

      border-radius: 4px;
      border: 1px solid #ddd;

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
  color: '#42cb59',
})``;

export const Content = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 4px;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      font-size: 16px;
      color: #444444;
    }

    tr:last-child {
      border-bottom: 0;
    }

    th:nth-last-child(-n + 3) {
      text-align: center;
    }

    tr td:nth-last-child(-n + 3) {
      text-align: center;
    }

    tr td {
      padding: 20px 0 20px 0;
      font-size: 16px;
      color: #666666;
      line-height: 20px;
      vertical-align: top;
    }

    tr {
      border-bottom: 1px solid #ddd;
    }

    tr td a {
      font-size: 15px;
      color: #4d85ee;
    }

    tr td a:last-child {
      margin-left: 23px;
      color: #de3b3b;
    }
  }
`;

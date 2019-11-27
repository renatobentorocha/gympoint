import styled from 'styled-components';

export const Container = styled.table`
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
`;

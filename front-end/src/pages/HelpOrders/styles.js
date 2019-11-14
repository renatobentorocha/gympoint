import styled from 'styled-components';

export const Container = styled.div`
  min-width: 700px;
  max-width: 700px;
  margin: 30px auto 0 auto;

  header {
    max-width: 700px;
    margin: 0 auto 30px auto;

    strong {
      font-family: Roboto, sans-serif;
      font-size: 24px;
      color: #444444;
      font-weight: bold;
    }
  }
`;

export const Content = styled.section`
  border-radius: 4px;
  background-color: #fff;
  padding: 30px;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      color: #444444;
    }

    tr:last-child {
      border-bottom: 0;
    }

    th:last-child {
      text-align: right;
    }

    tr td:last-child {
      text-align: right;
    }

    tr td {
      padding: 20px 0 20px 0;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      color: #666666;
      line-height: 20px;
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
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  min-width: 800px;
  max-width: 900px;
  margin: 30px auto 0 auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    strong {
      font-size: 24px;
      color: #444444;
      font-weight: bold;
    }
  }
`;

export const Content = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;

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

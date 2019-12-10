import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto 0;
`;

export const Content = styled.section`
  border-radius: 4px;
  background-color: #fff;
  padding: 30px;

  table {
    th:last-child {
      text-align: right;
    }

    tr td:last-child {
      text-align: right;
    }

    tr td a:last-child {
      margin: 0;
      color: #4d85ee;
    }
  }
`;

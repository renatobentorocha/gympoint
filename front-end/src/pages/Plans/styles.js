import styled from 'styled-components';

export const Container = styled.div`
  min-width: 800px;
  max-width: 900px;
  margin: 30px auto 0 auto;
`;

export const Content = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;

  table {
    th:nth-last-child(-n + 3) {
      text-align: center;
    }

    tr td:nth-last-child(-n + 3) {
      text-align: center;
    }
  }
`;

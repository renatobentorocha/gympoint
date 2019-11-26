import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  strong {
    font-size: 24px;
    color: #444444;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }

  button + div {
    position: relative;
  }
`;

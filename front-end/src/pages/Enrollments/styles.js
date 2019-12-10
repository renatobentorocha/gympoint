import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

export const Container = styled.div`
  max-width: 1291px;
  margin: 30px auto 0 auto;

  @media screen and (max-width: 996px) {
    table {
      th:nth-child(3),
      tr td:nth-child(3) {
        display: none;
      }

      th:nth-child(4),
      tr td:nth-child(4) {
        display: none;
      }
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

export const Content = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;

  table {
    th:first-child {
      text-align: left;
    }

    tr td:first-child {
      text-align: left;
    }
  }
`;

import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

export const Container = styled.div`
  min-width: 1100px;
  max-width: 1291px;
  margin: 30px auto 0 auto;
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

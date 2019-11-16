import React from 'react';
import ReactPaginate from 'react-paginate';

import { Container } from './styles';

export default function Paginate({ pageSize, handlePageSize, ...rest }) {
  return (
    <Container>
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={0}
        previousLabel="Anterior"
        nextLabel="Próximo"
        breakLabel="..."
        breakClassName="break-me"
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active_page"
        {...rest}
      />

      <div>
        <span>Registros por página:</span>
        <input value={pageSize} onChange={handlePageSize} />
      </div>
    </Container>
  );
}

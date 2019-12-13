import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Paginate({
  pageCount,
  forcePage,
  pageSize,
  handlePageSize,
  ...rest
}) {
  return (
    <Container pageCount={pageCount} forcePage={forcePage + 1}>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={forcePage}
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

Paginate.propTypes = {
  pageCount: PropTypes.number.isRequired,
  forcePage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  handlePageSize: PropTypes.func.isRequired,
};

Paginate.defaultProps = {
  pageSize: 5,
};

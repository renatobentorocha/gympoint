import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Answer from '~/pages/HelpOrders/Answer';

import {
  loadHelpOrderRequest,
  showHelpOrderRequest,
} from '~/store/modules/help_order/actions';

import Paginate from '~/components/Paginate';

import { Container, Content } from './styles';

export default function HelpOrders({ history }) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const { data, help_order } = useSelector(state => ({
    data: state.help_order.data,
    help_order: state.help_order.order,
  }));

  const dispatch = useDispatch();

  const loadHelpOrder = useCallback(
    pagination => dispatch(loadHelpOrderRequest(pagination)),
    [dispatch]
  );

  useEffect(() => {
    loadHelpOrder({ page, pageSize });
  }, [loadHelpOrder, page, pageSize]);

  function handleAnswer(id, e) {
    e.preventDefault();

    dispatch(showHelpOrderRequest(id));
  }

  function handleRegistriesNumberChange(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setPage(1);
    setPageSize(e.target.value);
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tfoot />
          <tbody>
            {data &&
              data.help_orders.map(order => (
                <tr key={order.id}>
                  <td>{order.student.name}</td>

                  <td>
                    <Link
                      to="/auxilios"
                      onClick={e => handleAnswer(order.id, e)}
                    >
                      responder
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && (
          <Paginate
            pageCount={data.page_count}
            forcePage={data.page - 1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            pageSize={pageSize}
            handlePageSize={handleRegistriesNumberChange}
          />
        )}
      </Content>
      {help_order && <Answer />}
    </Container>
  );
}

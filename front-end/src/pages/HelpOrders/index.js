import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Answer from '~/pages/HelpOrders/Answer';

import {
  loadHelpOrderRequest,
  showHelpOrderRequest,
} from '~/store/modules/help_order/actions';
import { Container, Content } from './styles';

export default function HelpOrders({ history }) {
  const { orders, help_order } = useSelector(state => ({
    orders: state.help_order.data,
    help_order: state.help_order.order,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHelpOrderRequest());
  }, [dispatch]);

  function handleAnswer(id, e) {
    e.preventDefault();

    dispatch(showHelpOrderRequest(id));
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
            {orders &&
              orders.map(order => (
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
      </Content>
      {help_order && <Answer />}
    </Container>
  );
}

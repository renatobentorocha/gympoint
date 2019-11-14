import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Answer from '~/pages/HelpOrders/Answer';

import { loadHelpOrderRequest } from '~/store/modules/help_order/actions';
import { Container, Content } from './styles';

export default function HelpOrders({ history }) {
  const orders = useSelector(state => state.help_order.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHelpOrderRequest());
  }, [dispatch]);

  function handleRegister() {
    history.push('/planos/novo');
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
                    <Link to={{ pathname: `/auxilios/${order.id}` }}>
                      responder
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Content>
      <Answer />
    </Container>
  );
}

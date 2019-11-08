import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  loadPlansRequest,
  deletePlanRequest,
} from '~/store/modules/plan/actions';
import { Container, Content } from './styles';

export default function Plans({ history }) {
  const plans = useSelector(state => state.plan.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlansRequest());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegister() {
    history.push('/planos/novo');
  }

  function deleteConfirm(e, id) {
    e.preventDefault();

    if (window.confirm('Deseja continuar')) {
      dispatch(deletePlanRequest(id));
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button" onClick={() => handleRegister()}>
            <MdAdd size={20} />
            CADASTRAR
          </button>
        </div>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tfoot />
          <tbody>
            {plans &&
              plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td>{plan.price}</td>
                  <td>
                    <Link to={{ pathname: `/planos/${plan.id}` }}>editar</Link>
                    <Link to="/planos" onClick={e => deleteConfirm(e, plan.id)}>
                      apagar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

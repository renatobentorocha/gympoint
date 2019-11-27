import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  loadPlansRequest,
  deletePlanRequest,
} from '~/store/modules/plan/actions';

import Paginate from '~/components/Paginate';
import Header from '~/pages/Header/List';
import Table from '~/components/Table';

import { Container, Content } from './styles';

export default function Plans({ history }) {
  const data = useSelector(state => state.plan.data);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const loadPlans = useCallback(
    pagination => dispatch(loadPlansRequest(pagination)),
    [dispatch]
  );

  useEffect(() => {
    loadPlans({ page, pageSize });
  }, [loadPlans, page, pageSize]);

  function handleRegister() {
    history.push('/planos/novo');
  }

  function deleteConfirm(e, id) {
    e.preventDefault();

    if (window.confirm('Deseja continuar')) {
      dispatch(deletePlanRequest(id));
    }
  }

  function handleRegistriesNumberChange(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setPage(1);
    setPageSize(e.target.value);
  }

  return (
    <Container>
      <Header title="Gerenciando planos" handleRegister={handleRegister} />
      <Content>
        <Table>
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
            {data.plans &&
              data.plans.map(plan => (
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
        </Table>
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
    </Container>
  );
}

Plans.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

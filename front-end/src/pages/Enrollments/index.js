import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

import {
  loadEnrollmentsRequest,
  deleteEnrollmentRequest,
} from '~/store/modules/enrollment/actions';

import Paginate from '~/components/Paginate';
import Header from '~/pages/Header/List';

import { Container, Content } from './styles';

export default function Enrollments({ history }) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const data = useSelector(state => state.enrollment.data);
  const dispatch = useDispatch();

  const loadEnrollments = useCallback(
    pagination => dispatch(loadEnrollmentsRequest(pagination)),
    [dispatch]
  );

  useEffect(() => {
    loadEnrollments({ page, pageSize });
  }, [dispatch, loadEnrollments, page, pageSize]);

  function handleRegister() {
    history.push('/matriculas/nova');
  }

  function deleteConfirm(e, id) {
    e.preventDefault();

    if (window.confirm('Deseja continuar')) {
      dispatch(deleteEnrollmentRequest(id));
    }
  }

  function handleRegistriesNumberChange(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setPage(1);
    setPageSize(e.target.value);
  }

  return (
    <Container>
      <Header title="Gerenciando matrículas" handleRegister={handleRegister} />
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th />
            </tr>
          </thead>
          <tfoot />
          <tbody>
            {data.enrollments &&
              data.enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.plan.title}</td>
                  <td>{enrollment.start_date}</td>
                  <td>{enrollment.end_date}</td>
                  <td>
                    <MdCheckCircle
                      size={20}
                      color={enrollment.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <Link
                      to={{ pathname: `/matriculas/${enrollment.student.id}` }}
                    >
                      editar
                    </Link>
                    <Link
                      to="/matriculas"
                      onClick={e => deleteConfirm(e, enrollment.id)}
                    >
                      apagar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data.enrollments && (
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

Enrollments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

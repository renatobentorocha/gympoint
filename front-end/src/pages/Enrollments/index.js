import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import {
  loadEnrollmentsRequest,
  deleteEnrollmentRequest,
} from '~/store/modules/enrollment/actions';
import { Container, SearchIcon, Content } from './styles';

export default function Enrollments({ history }) {
  const enrollments = useSelector(state => state.enrollment.data);
  const dispatch = useDispatch();

  const loadEnrollments = useCallback(
    e => dispatch(loadEnrollmentsRequest(e)),
    [dispatch]
  );

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  function handleRegister() {
    history.push('/matriculas/nova');
  }

  function deleteConfirm(e, id) {
    e.preventDefault();

    if (window.confirm('Deseja continuar')) {
      dispatch(deleteEnrollmentRequest(id));
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>

        <button type="button" onClick={() => handleRegister()}>
          <MdAdd size={20} />
          CADASTRAR
        </button>
      </header>
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
            {enrollments &&
              enrollments.map(enrollment => (
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
      </Content>
    </Container>
  );
}

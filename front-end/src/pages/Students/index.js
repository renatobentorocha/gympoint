import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import {
  loadStudentsRequest,
  deleteStudentRequest,
} from '~/store/modules/student/actions';
import { Container, SearchIcon, Content, PaginateWrapper } from './styles';

export default function Students({ history }) {
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const data = useSelector(state => state.student.data);
  const dispatch = useDispatch();

  const loadStudent = useCallback(
    (filtering, pagination) =>
      dispatch(loadStudentsRequest(filtering, pagination)),
    [dispatch]
  );

  useEffect(() => {
    loadStudent(filter, { page, pageSize });
  }, [loadStudent, filter, page, pageSize]);

  function handleRegister() {
    history.push('/alunos/novo');
  }

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  function deleteConfirm(e, id) {
    e.preventDefault();

    if (window.confirm('Deseja continuar')) {
      dispatch(deleteStudentRequest(id));
    }
  }

  function handleRegistriesNumberChange(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setPage(1);
    setPageSize(e.target.value);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button" onClick={() => handleRegister()}>
            <MdAdd size={20} />
            CADASTRAR
          </button>
          <div>
            <input
              value={filter}
              placeholder="Buscar aluno"
              onChange={handleFilter}
            />
            <SearchIcon />
          </div>
        </div>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th>MATRÍCULA ATIVA</th>
              <th />
            </tr>
          </thead>
          <tfoot />
          <tbody>
            {data &&
              data.students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <MdCheckCircle
                      size={20}
                      color={student.enrollment_active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <Link to={{ pathname: `/alunos/${student.id}` }}>
                      editar
                    </Link>
                    <Link
                      to="/alunos"
                      onClick={e => deleteConfirm(e, student.id)}
                    >
                      apagar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data && (
          <PaginateWrapper>
            <ReactPaginate
              pageCount={data.page_count}
              marginPagesDisplayed={2}
              pageRangeDisplayed={0}
              forcePage={data.page - 1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              previousLabel="Anterior"
              nextLabel="Próximo"
              breakLabel="..."
              breakClassName="break-me"
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active_page"
            />

            <div>
              <span>Registros por página:</span>
              <input value={pageSize} onChange={handleRegistriesNumberChange} />
            </div>
          </PaginateWrapper>
        )}
      </Content>
    </Container>
  );
}

Students.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

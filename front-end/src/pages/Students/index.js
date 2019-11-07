import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import { loadStudentRequest } from '~/store/modules/student/actions';
import { Container, SearchIcon, Content } from './styles';

export default function Students({ history }) {
  const [filter, setFilter] = useState('');
  const students = useSelector(state => state.student.data);
  const dispatch = useDispatch();

  const loadStudent = useCallback(f => dispatch(loadStudentRequest(f)), [
    dispatch,
  ]);

  useEffect(() => {
    loadStudent(filter);
  }, [loadStudent, filter]);

  function handleRegister() {
    history.push('/alunos/novo');
  }

  function handleFilter(e) {
    setFilter(e.target.value);
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
            {students &&
              students.map(student => (
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
                    <a href="/">editar</a>
                    <a href="/">apagar</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

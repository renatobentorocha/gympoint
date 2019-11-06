import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import { loadStudentRequest } from '~/store/modules/student/actions';
import { Container, SearchIcon, Content } from './styles';

export default function Students() {
  const dispatch = useDispatch();

  const loadStudent = useCallback(
    filter => dispatch(loadStudentRequest(filter)),
    [dispatch]
  );

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button">
            <MdAdd size={20} />
            CADASTRAR
          </button>
          <div>
            <input placeholder="Buscar aluno" />
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
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#42cb59" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#42cb59" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#ddd" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#42cb59" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#ddd" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
            <tr>
              <td>Cha Ji-Hun</td>
              <td>example@rocketseat.com.br</td>
              <td>20</td>
              <td>
                <MdCheckCircle size={20} color="#42cb59" />
              </td>
              <td>
                <a href="/">editar</a>
                <a href="/">apagar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}

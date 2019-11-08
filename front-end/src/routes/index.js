import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Register from '~/pages/Students/Register';
import Plans from '~/pages/Plans';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <PrivateRoute path="/alunos" exact component={Students} isPrivate />
      <PrivateRoute path="/alunos/novo" component={Register} isPrivate />
      <PrivateRoute path="/alunos/:id" component={Register} isPrivate />
      <PrivateRoute path="/planos" component={Plans} isPrivate />
    </Switch>
  );
}

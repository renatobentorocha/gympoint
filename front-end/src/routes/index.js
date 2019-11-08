import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Register from '~/pages/Students/Register';
import Plans from '~/pages/Plans';
import RegisterPlan from '~/pages/Plans/Register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <PrivateRoute path="/alunos" exact component={Students} isPrivate />
      <PrivateRoute path="/alunos/novo" component={Register} isPrivate />
      <PrivateRoute path="/alunos/:id" component={Register} isPrivate />
      <PrivateRoute path="/planos" exact component={Plans} isPrivate />
      <PrivateRoute path="/planos/novo" component={RegisterPlan} isPrivate />
      <PrivateRoute path="/planos/:id" component={RegisterPlan} isPrivate />
    </Switch>
  );
}

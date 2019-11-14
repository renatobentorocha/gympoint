import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Register from '~/pages/Students/Register';
import Plans from '~/pages/Plans';
import RegisterPlan from '~/pages/Plans/Register';
import Enrollments from '~/pages/Enrollments';
import RegisterEnrollment from '~/pages/Enrollments/Register';
import HelpOrders from '~/pages/HelpOrders';

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
      <PrivateRoute
        path="/matriculas"
        exact
        component={Enrollments}
        isPrivate
      />
      <PrivateRoute
        path="/matriculas/nova"
        component={RegisterEnrollment}
        isPrivate
      />
      <PrivateRoute
        path="/matriculas/:id"
        component={RegisterEnrollment}
        isPrivate
      />
      <PrivateRoute path="/auxilios" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}

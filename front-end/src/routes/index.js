import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './PrivateRoute';

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
      <Route path="/alunos" exact component={Students} isPrivate />
      <Route path="/alunos/novo" component={Register} isPrivate />
      <Route path="/alunos/:id" component={Register} isPrivate />
      <Route path="/planos" exact component={Plans} isPrivate />
      <Route path="/planos/novo" component={RegisterPlan} isPrivate />
      <Route path="/planos/:id" component={RegisterPlan} isPrivate />
      <Route path="/matriculas" exact component={Enrollments} isPrivate />
      <Route path="/matriculas/nova" component={RegisterEnrollment} isPrivate />
      <Route path="/matriculas/:id" component={RegisterEnrollment} isPrivate />
      <Route path="/auxilios" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}

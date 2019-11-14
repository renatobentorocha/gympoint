import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

import DefaultLayout from '~/pages/_layouts/default';

export default function PrivateRoute({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/alunos" />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <DefaultLayout {...props}>
            <Component {...props} />
          </DefaultLayout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

PrivateRoute.defaultProps = {
  isPrivate: false,
};

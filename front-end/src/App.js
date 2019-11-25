import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Routes from '~/routes';
import history from './services/history';

import { store, persistor } from './store';

import { session } from '~/services/interceptors';

import GlobalStyle from '~/styles/global';

function App() {
  useEffect(() => {
    session(store.dispatch);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

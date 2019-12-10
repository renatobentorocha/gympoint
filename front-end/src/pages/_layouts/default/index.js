import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { WrapperHeader, WrapperContent } from './styles';

export default function DefaultLayout({ children, ...rest }) {
  return (
    <>
      <WrapperHeader style={{ backgroundColor: '#fff' }}>
        <Header {...rest} />
      </WrapperHeader>

      <WrapperContent>{children}</WrapperContent>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

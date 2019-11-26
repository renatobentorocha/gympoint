import React from 'react';
import PropTypes from 'prop-types';
import MaterialDesignIcons from '~/components/MaterialDesignIcons';

import { TButton, Spinner } from './styles';

function Button({ loading, onClick, title, icon, icon_size, ...res }) {
  return (
    <TButton type="button" onClick={() => onClick()} {...res}>
      {loading ? (
        <Spinner />
      ) : (
        <MaterialDesignIcons icon={icon} size={icon_size} />
      )}
      {title}
    </TButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  icon_size: PropTypes.number,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  icon: null,
  icon_size: 20,
  loading: false,
};

export default Button;

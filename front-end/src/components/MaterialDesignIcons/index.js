import React from 'react';
import PropTypes from 'prop-types';
import * as MaterialDesign from 'react-icons/md';

export default function MaterialDesignIcons({ icon, icon_size }) {
  const MdIcon = MaterialDesign[icon];

  return MdIcon ? <MdIcon size={icon_size} /> : null;
}

MaterialDesignIcons.propTypes = {
  icon: PropTypes.string,
  icon_size: PropTypes.number,
};

MaterialDesignIcons.defaultProps = {
  icon: null,
  icon_size: 20,
};

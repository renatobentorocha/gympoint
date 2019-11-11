import React from 'react';
import { components } from 'react-select';
import { MdKeyboardArrowDown } from 'react-icons/md';

export const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <MdKeyboardArrowDown size={20} color="#cccccc" />
    </components.DropdownIndicator>
  );
};

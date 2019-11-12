import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

import { useField } from '@rocketseat/unform';

import { customStyles } from '~/styles/ReactSelect';

export default function AsyncReactSelect({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <AsyncSelect
        styles={customStyles}
        name={fieldName}
        aria-label={fieldName}
        ref={ref}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

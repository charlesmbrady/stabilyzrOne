import style from './style.css';
import React from 'react';
import useForm from '../../Hooks/useForm';

export default function FieldGroup({ type, label, name, placeholder }) {
  const { handleChange, formValues, formErrors } = useForm();

  return (
    <div className={style.fieldGroup}>
      <label className={style.label} data-test={`${name}-label`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={formErrors[name] ? style.invalidInput : style.input}
        value={formValues[name]}
        onChange={handleChange}
        data-test={`${name}-input`}
      />
      <small className={style.error} data-test={`${name}-error`}>
        {formErrors[name]}
      </small>
    </div>
  );
}

import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  isNumber
}) => {
  let onInternalChange = event => {
    event.isNumber = isNumber;
    onChange(event);
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          value={value}
          onChange={onInternalChange}
          className="form-control"
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default SelectInput;

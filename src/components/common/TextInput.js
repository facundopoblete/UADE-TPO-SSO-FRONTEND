import React from "react";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  isNumber
}) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  let onInternalChange = event => {
    event.isNumber = isNumber;
    onChange(event);
  };

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onInternalChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;

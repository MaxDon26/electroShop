import React from "react";
import PropTypes from "prop-types";
import style from "./form.module.css";

const CheckBoxField = ({ name, value, children, onChange }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };
  return (
    <div className={style.wrapper + " " + style.checkboxWrapper}>
      <input
        className={style.checkbox}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />

      <label htmlFor={name}> {children}</label>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default CheckBoxField;

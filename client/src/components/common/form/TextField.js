import React from "react";
import PropTypes from "prop-types";
import style from "./form.module.css";

const TextField = ({ label, className, name, onChange, error, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className={style.wrapper}>
      {" "}
      <label htmlFor={name}> {label}</label>{" "}
      <input
        className={style.input}
        name={name}
        onChange={handleChange}
        {...rest}
      />{" "}
      {error && (
        <label className={style.error} htmlFor={name}>
          {error}
        </label>
      )}
    </div>
  );
};

TextField.propTypes = {};

export default TextField;

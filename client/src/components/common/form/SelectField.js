import React from "react";
import PropTypes from "prop-types";

import style from "./form.module.css";

const SelectField = ({
  name,
  options,
  defaultOption,
  value,
  label,
  handleChange,
}) => {
  const onChange = ({ target }) => {
    handleChange(target.name, target.value);
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options.map((optionName) => ({
          label: optionName.name,
          value: optionName._id,
        }));
  return (
    <div className={style.selectWrapper}>
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={style.select}
        id="validationCustom04"
        name={name}
        value={value || ""}
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default SelectField;

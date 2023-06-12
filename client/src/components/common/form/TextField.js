import React from "react";
import PropTypes from "prop-types";

const TextField = ({ ...rest }) => {
  return <input {...rest} />;
};

TextField.propTypes = {};

export default TextField;

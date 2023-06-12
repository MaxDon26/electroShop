import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./button.module.css";

export const Button = ({ children, to, desc }) => {
  return (
    <Link className={style.btn} to={to}>
      {children}
      <span>{desc}</span>
    </Link>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  desc: PropTypes.string,
  to: PropTypes.string,
};

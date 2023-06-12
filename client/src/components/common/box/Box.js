import React from "react";
import style from "./Box.module.css";

export const Box = ({ children, classes }) => {
  return (
    <div className={style.box + (classes && " " + classes)}> {children}</div>
  );
};

Box.defaultProps = {
  classes: "",
};

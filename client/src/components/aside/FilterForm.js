import React from "react";
import PropTypes from "prop-types";
import style from "./FilterForm.module.css";
import { Box } from "../common/box";

export const FilterPanel = (props) => {
  return (
    <aside className={style.aside}>
      <Box>Filter Panel</Box>
    </aside>
  );
};

FilterPanel.propTypes = {};

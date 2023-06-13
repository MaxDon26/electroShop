import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
const initialState = { name: "", category: "", vendor: "" };

const FilterContext = React.createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filtredData, setFiltredData] = useState(initialState);

  const handleFiltredChange = (name, value) => {
    setFiltredData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFiltredData(initialState);
  };

  return (
    <FilterContext.Provider
      value={{ handleFiltredChange, filtredData, handleReset }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

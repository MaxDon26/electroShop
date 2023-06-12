import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const FilterContext = React.createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filtredData, setFiltredData] = useState({});

  const handleFiltredChange = (name, value) => {
    setFiltredData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FilterContext.Provider value={{ handleFiltredChange, filtredData }}>
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

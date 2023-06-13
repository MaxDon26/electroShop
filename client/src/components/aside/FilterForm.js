import React from "react";

import style from "./FilterForm.module.css";
import { Box } from "../common/box";
import SelectField from "../common/form/SelectField";
import { useFilter } from "../../hooks/useFilter";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/category";
import { getVendors } from "../../store/vendor";
import { getFiltredProducts } from "../../store/product";

export const FilterPanel = () => {
  const { handleFiltredChange, filtredData, handleReset } = useFilter();
  const category = useSelector(getCategories());
  const vendors = useSelector(getVendors());
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(getFiltredProducts(filtredData));
  };

  return (
    <aside className={style.aside}>
      <Box classes={style.box}>
        <SelectField
          defaultOption="Выберите категорию"
          label="Категория"
          handleChange={handleFiltredChange}
          options={category}
          value={filtredData.category}
          name="category"
        />
        <SelectField
          defaultOption="Выберите производителя"
          label="Производитель"
          handleChange={handleFiltredChange}
          options={vendors}
          value={filtredData.vendor}
          name="vendor"
        />
        <button onClick={handleSubmit} className={style.submit}>
          Применить
        </button>
        <button onClick={handleReset} className={style.reset}>
          Сбросить
        </button>
      </Box>
    </aside>
  );
};

FilterPanel.propTypes = {};

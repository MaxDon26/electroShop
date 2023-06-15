import React from "react";
import { Box } from "../../common/box";
import style from "./SortingPanel.module.css";

const sortedVariant = [
  { name: "Сначала недорогие", value: "priceLow", order: "desc" },
  { name: "Сначала дорогие", value: "priceHigh", order: "asc" },
  { name: "Сначала популярные", value: "popular", order: "asc" },
];

export const SortingPanel = ({ sort }) => {
  const handleSort = ({ target }) => {
    if (target.value === "priceLow")
      sort.setSortBy({ path: "price", order: "asc" });
    else if (target.value === "priceHigh") {
      sort.setSortBy({ path: "price", order: "desc" });
    } else {
      sort.setSortBy({ path: target.value, order: "asc" });
    }
  };
  return (
    <Box classes={style.box}>
      <label>Сортировать по: </label>
      <select
        className={style.sorting}
        defaultValue="popular"
        // value={sort.sortBy.path}
        onChange={handleSort}
      >
        {sortedVariant.map((variant) => (
          <option key={variant.name} value={variant.value}>
            {variant.name}
          </option>
        ))}
      </select>
    </Box>
  );
};

SortingPanel.propTypes = {};

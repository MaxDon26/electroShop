import React, { useState } from "react";
import style from "./main.module.css";
import { FilterPanel } from "../../components/aside";
import { ProductsList } from "../../components/pages/productsList/productsList";
import { SortingPanel } from "../../components/products/sortingPanel";

export const Main = () => {
  const [sortBy, setSortBy] = useState({ path: "popular", order: "asc" });

  return (
    <div className={style.main}>
      <div className="container">
        <div className={style.wrapper}>
          <FilterPanel />
          <div className={style.productWrapper}>
            <SortingPanel sort={{ sortBy, setSortBy }} />
            <ProductsList sortBy={sortBy} />
          </div>
        </div>
      </div>
    </div>
  );
};

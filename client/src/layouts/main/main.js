import React from "react";
import style from "./main.module.css";
import { FilterPanel } from "../../components/aside";
import { ProductsList } from "../../components/pages/productsList/productsList";
import { SortingPanel } from "../../components/products/sortingPanel";

export const Main = () => {
  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.wrapper}>
          <FilterPanel />
          <div className={style.productWrapper}>
            <SortingPanel />
            <ProductsList />
          </div>
        </div>
      </div>
    </main>
  );
};

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts, getProductsStatus } from "../../../store/product";

import { ProductCard } from "../../products/productCard";
import style from "./productList.module.css";

export const ProductsList = (props) => {
  const products = useSelector(getProducts());

  const isLoading = useSelector(getProductsStatus());

  return (
    <>
      {!isLoading && (
        <div className={style.list}>
          Product Panel
          {products.map((prod) => (
            <ProductCard key={prod._id} {...prod} />
          ))}
        </div>
      )}
    </>
  );
};

ProductsList.propTypes = {};

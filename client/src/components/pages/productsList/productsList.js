import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts, getProductsStatus } from "../../../store/product";

import { ProductCard } from "../../products/productCard";
import style from "./productList.module.css";
import _ from "lodash";

export const ProductsList = ({ sortBy }) => {
  const products = useSelector(getProducts());

  const isLoading = useSelector(getProductsStatus());

  return (
    <>
      {!isLoading && (
        <div className={style.list}>
          {_.orderBy(products, sortBy.path, sortBy.order).map((prod) => (
            <ProductCard key={prod._id} {...prod} />
          ))}
        </div>
      )}
    </>
  );
};

ProductsList.propTypes = {
  sortBy: PropTypes.object,
};

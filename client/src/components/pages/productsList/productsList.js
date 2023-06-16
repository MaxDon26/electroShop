import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts, getProductsStatus } from "../../../store/product";

import { ProductCard } from "../../products/productCard";
import style from "./productList.module.css";
import _ from "lodash";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";

export const ProductsList = ({ sortBy }) => {
  const products = useSelector(getProducts());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const isLoading = useSelector(getProductsStatus());

  const count = products.length;
  const productCrop = paginate(products, currentPage, pageSize);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className={style.list}>
            {_.orderBy(productCrop, sortBy.path, sortBy.order).map((prod) => (
              <ProductCard key={prod._id} {...prod} />
            ))}
          </div>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

ProductsList.propTypes = {
  sortBy: PropTypes.object,
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryStatus, loadCategories } from "../../store/category";
import { getVendorStatus, loadVendors } from "../../store/vendor";
import {
  getProductsStatus,
  loadPopularProducts,
  loadProductsNames,
} from "../../store/product";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadVendors());
    dispatch(loadPopularProducts());
    dispatch(loadProductsNames());
  }, []);

  const productsLoading = useSelector(getProductsStatus());
  const categoryLoading = useSelector(getCategoryStatus());
  const vendorLoading = useSelector(getVendorStatus());

  useEffect(() => {
    if (!productsLoading && !categoryLoading && !vendorLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [productsLoading, categoryLoading, vendorLoading]);

  return !isLoading && children;
};

export default AppLoader;

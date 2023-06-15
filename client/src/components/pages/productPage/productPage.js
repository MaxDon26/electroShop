import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addOrder,
  getProductById,
  getProductsStatus,
} from "../../../store/product";
import { Box } from "../../common/box";
import style from "./productPage.module.css";
import { getImageUrl } from "../../../utils/getImage";
// import { getCategoryById } from "../../../store/category";
import { getVendorById } from "../../../store/vendor";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState(null);

  const handleClickImage = (img) => {
    setCurrentImage(img);
  };

  const handleAddBasket = (id) => {
    dispatch(addOrder(id));
  };

  const product = useSelector(getProductById(id));
  const vendor = useSelector(getVendorById(product.vendor));
  useEffect(() => {
    if (product) {
      setCurrentImage(product.image[0]);
    }
  }, [product]);

  return (
    <div>
      {product && (
        <>
          <h2>{product.name}</h2>
          <Box>
            <div className={style.images}>
              <div className={style.imagesList}>
                {product.image.map((i) => (
                  <img
                    key={i}
                    onClick={() => handleClickImage(i)}
                    src={getImageUrl(i)}
                    className={style.image}
                    alt="photo"
                  />
                ))}
              </div>
              <div className={style.mainImage}>
                {currentImage && (
                  <img
                    width="100%"
                    height="100%"
                    src={getImageUrl(currentImage)}
                    alt="photo"
                  />
                )}
              </div>
            </div>
            <div className={style.info}>
              <h3 className={style.name}>{product.name} </h3>
              <div className={style.vendor}>
                {<img width={100} src={getImageUrl(vendor.image)} />}
              </div>
              <div>
                <h4>Параметры:</h4>
                <ul>
                  {Object.keys(product.description).map((key) => (
                    <li key={key}>
                      <b>{key}: </b>
                      {product.description[key]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Box classes={style.buy}>
              <span className={style.price}> {product.price} Р</span>
              <button
                onClick={() => handleAddBasket(id)}
                className={style.submit}
              >
                {" "}
                В корзину
              </button>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

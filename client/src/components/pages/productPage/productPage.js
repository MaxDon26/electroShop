import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, getProductsStatus } from "../../../store/product";
import { Box } from "../../common/box";
import style from "./productPage.module.css";
import { getImageUrl } from "../../../utils/getImage";
import { getCategoryById } from "../../../store/category";
import { getVendorById } from "../../../store/vendor";

export const ProductPage = () => {
  const { id } = useParams();

  const [currentImage, setCurrentImage] = useState(null);

  const handleClick = (img) => {
    setCurrentImage(img);
  };

  const product = useSelector(getProductById(id));

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
                    onClick={() => handleClick(i)}
                    src={getImageUrl(i)}
                    className={style.image}
                    alt="photo"
                  />
                ))}
              </div>
              <div className={style.mainImage}>
                <img
                  width="100%"
                  height="100%"
                  src={getImageUrl(currentImage)}
                  alt="photo"
                />
              </div>
            </div>
            <div className={style.info}>
              <h3>{product.name} </h3>
              {/* <h3>{vendor.name}</h3> */}
            </div>
          </Box>
        </>
      )}
    </div>
  );
};

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./basket.module.css";
import { addOrder, getProductById, removeOrder } from "../../store/product";
import { Box } from "../common/box";
import { getImageUrl } from "../../utils/getImage";
import { getColor } from "../../utils/getColor";

export const BasketItem = ({ ord: product }) => {
  const dispatch = useDispatch();
  return (
    <>
      {product && (
        <li className={style.basketItem}>
          <Box classes={style.BasketItemBox}>
            <img
              width={50}
              className={style.BasketItemImage}
              src={getImageUrl(product.image[0])}
            />
            <div className={style.info}>
              {" "}
              <span>
                {product.name}, цвет: {getColor(product.color)}
              </span>
              <span>
                <b>{product.price} Р.</b>
              </span>
            </div>
            <Box classes={style.BasketItemBox}>
              <button
                onClick={() => dispatch(addOrder(product._id, -1))}
                className={style.math}
              >
                -
              </button>
              <span>{product.count}</span>
              <button
                onClick={() => dispatch(addOrder(product._id, 1))}
                className={style.math}
              >
                +
              </button>
            </Box>
            <button
              onClick={() => dispatch(removeOrder(product._id))}
              className={style.remove}
            >
              Удалить
            </button>
          </Box>
        </li>
      )}
    </>
  );
};

import React, { useRef } from "react";
import style from "./basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, toggleBasket } from "../../store/product";
import { BasketItem } from "./basketItem";

export const Basket = () => {
  const isOpenBasket = useSelector((state) => state.product.basket.isOpen);
  const order = useSelector(getOrder());
  const dispatch = useDispatch();
  const basket = useRef();

  const sum = order.reduce((acc, ord) => acc + ord.price * ord.count, 0);

  console.log(sum);

  const handleToggle = ({ target }) => {
    if (target.closest(`.${basket.current.className}`) !== basket.current) {
      dispatch(toggleBasket());
    }
  };
  return (
    <div
      onClick={handleToggle}
      className={
        style.basketOverlay + " " + (!isOpenBasket ? style.hidden : "")
      }
    >
      <div ref={basket} className={style.basket}>
        <h2>Корзина</h2>
        <ul>
          {order.length > 0 &&
            order.map((ord, idx) => (
              <BasketItem key={ord._id + idx} ord={ord} />
            ))}
        </ul>

        <h3 className={style.sum}>Сумма покупок: {sum} руб.</h3>
      </div>
    </div>
  );
};

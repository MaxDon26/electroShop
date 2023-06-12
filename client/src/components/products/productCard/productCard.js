import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../common/box";
import { useSelector } from "react-redux";
import { getCategoryById } from "../../../store/category";
import styles from "./productCard.module.css";
import { Link } from "react-router-dom";
import { getColor } from "../../../utils/getColor";
export const ProductCard = (props) => {
  const { image, category: categoryId, name, color, price, _id } = props;
  const category = useSelector(getCategoryById(categoryId));
  console.log(props);
  return (
    <Box classes={styles.card}>
      <img width={200} src={image[0]} alt="img" />
      <div className={styles.info}>
        <Link to={"products/" + _id} className={styles.name}>
          <b>{category.name}</b> {name}
        </Link>
        <p> цвет: {getColor(color)}</p>
        <span>
          <Link to={"products/" + _id}>Подробнее</Link>
        </span>
      </div>
      <div className={styles.buy}>
        <span className={styles.price}>{price} Р.</span>
      </div>
    </Box>
  );
};

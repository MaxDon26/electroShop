import logo from "../../assets/logo.png";
import { Search, Cart4, BoxArrowRight } from "react-bootstrap-icons";
import TextField from "../common/form/TextField";
import styles from "./NavBar.module.css";
import { Button } from "./button";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getFiltredProducts, loadPopularProducts } from "../../store/product";
import { useFilter } from "../../hooks/useFilter";

export const NavBar = () => {
  const { handleFiltredChange, filtredData } = useFilter();
  const searchValue = filtredData.name ?? "";

  const [selectedValue, setSelectedValue] = useState(null);
  const [viewFinder, setViewFinder] = useState(false);
  const dispatch = useDispatch();
  const names = useSelector((state) => state.product.names);

  const handleClick = ({ target }) => {
    const name = target.getAttribute("name");
    setViewFinder(false);
    setSelectedValue(target.textContent);
    handleFiltredChange(name, target.textContent);
  };

  const handleSearch = ({ target }) => {
    // if (!target.value) {
    //   return dispatch(loadPopularProducts());
    // }
    setSelectedValue(null);
    handleFiltredChange(target.name, target.value);
  };
  const handleSubmit = () => {
    dispatch(getFiltredProducts(filtredData));
  };

  const filtredNames = names
    ? names.filter((el) => el.toLowerCase().includes(searchValue.toLowerCase()))
    : [];

  useEffect(() => {
    if (filtredNames.length === 0 || searchValue.length < 2 || selectedValue) {
      setViewFinder(false);
    } else {
      setViewFinder(true);
    }
  }, [filtredNames, searchValue]);

  return (
    <NavBarLayout
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleSubmit={handleSubmit}
      filtredNames={filtredNames}
      viewFinder={viewFinder}
      handleClick={handleClick}
    />
  );
};

const NavBarLayout = ({
  searchValue,
  handleSearch,
  handleSubmit,
  handleClick,
  filtredNames,
  viewFinder,
}) => (
  <header className={styles.header}>
    <div className="container">
      <nav className={styles.nav}>
        <Button to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Button>

        <div className={styles.searchWrapper}>
          <TextField
            name="name"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Искать на сайте"
            className={styles.search}
          />
          <button
            onClick={handleSubmit}
            role="button"
            className={styles.searchBtn}
          >
            <Search size={40} color="#fff" />
          </button>

          {viewFinder && searchValue && (
            <div className={styles.finded}>
              <ul className={styles.list}>
                {filtredNames.map((el) => (
                  <li
                    name="name"
                    key={el}
                    onClick={handleClick}
                    className={styles.link}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.btnsWrapper}>
          <Button to="/cart" desc="Корзина">
            <Cart4 size={40} color="#4e4e4e" />
          </Button>
          <Button to="/login" desc="Войти">
            <BoxArrowRight size={40} color="#4e4e4e" />
          </Button>
        </div>
      </nav>
    </div>
  </header>
);

NavBarLayout.propTypes = {
  searchValue: PropTypes.string,
  handleSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
  filtredNames: PropTypes.arrayOf(PropTypes.string),
  viewFinder: PropTypes.bool,
  handleClick: PropTypes.func,
};

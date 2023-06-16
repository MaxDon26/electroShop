import logo from "../../assets/logo.png";
import {
  Search,
  Cart4,
  BoxArrowRight,
  Clipboard2Data,
  BoxArrowInRight,
} from "react-bootstrap-icons";

import styles from "./NavBar.module.css";
import { Button } from "./button";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiltredProducts,
  getOrder,
  toggleBasket,
} from "../../store/product";
import { useFilter } from "../../hooks/useFilter";
import { getIsLoggedIn, getUserRole, logOut } from "../../store/auth";

export const NavBar = () => {
  const { handleFiltredChange, filtredData } = useFilter();
  const searchValue = filtredData.name ?? "";
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isAdmin = useSelector(getUserRole()) === "admin" ? true : false;
  const names = useSelector((state) => state.product.names);
  const order = useSelector(getOrder());

  const [selectedValue, setSelectedValue] = useState(null);
  const [viewFinder, setViewFinder] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

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
    setViewFinder(false);
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
      isLoggedIn={isLoggedIn}
      handleLogout={handleLogout}
      isAdmin={isAdmin}
      dispatch={dispatch}
      order={order}
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
  isLoggedIn,
  handleLogout,
  isAdmin,
  dispatch,
  order,
}) => {
  const count = order.reduce((acc, item) => acc + item.count, 0);

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Button to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Button>

          <div className={styles.searchWrapper}>
            <input
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
            <Button onClick={() => dispatch(toggleBasket())} desc="Корзина">
              <Cart4 size={40} color="#4e4e4e" />
              {count > 0 && <div className={styles.cartCount}>{count}</div>}
            </Button>

            {isLoggedIn ? (
              <>
                <Button onClick={handleLogout} desc="Выйти">
                  <BoxArrowRight size={40} color="#4e4e4e" />
                </Button>
                {isAdmin && (
                  <Button to="/admin" desc="Админ панель">
                    <Clipboard2Data size={40} color="#4e4e4e" />
                  </Button>
                )}
              </>
            ) : (
              <Button to="/login" desc="Войти">
                <BoxArrowInRight size={40} color="#4e4e4e" />
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

NavBarLayout.propTypes = {
  searchValue: PropTypes.string,
  handleSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
  filtredNames: PropTypes.arrayOf(PropTypes.string),
  viewFinder: PropTypes.bool,
  handleClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func,
  isAdmin: PropTypes.bool,
};

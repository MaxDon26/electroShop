import { useSelector } from "react-redux";
import AppLoader from "./components/hoc/appLoader";
import { NavBar } from "./components/navbar";
import { getProducts } from "./store/product";
import { FilterProvider } from "./hooks/useFilter";
import { Main } from "./layouts/main";

function App() {
  const product = useSelector(getProducts());
  console.log(product);
  return (
    <AppLoader>
      <FilterProvider>
        <NavBar />
        <Main />
      </FilterProvider>
    </AppLoader>
  );
}

export default App;

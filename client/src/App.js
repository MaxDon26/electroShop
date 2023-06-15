import AppLoader from "./components/hoc/appLoader";
import { NavBar } from "./components/navbar";
import { FilterProvider } from "./hooks/useFilter";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "./components/pages/productPage";
import { Footer } from "./components/footer";
import { Main } from "./layouts/main";
import { Login } from "./layouts/login";
import { Admin } from "./layouts/admin";
import ProtectedRoute from "./components/common/protectedRoute";
import { Basket } from "./components/basket";

function App() {
  return (
    <div className="app">
      <FilterProvider>
        <NavBar />
        <div className="container">
          <main className="main">
            <AppLoader>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/products/:id" element={<ProductPage />} />
              </Routes>
            </AppLoader>
          </main>
          <Basket />
        </div>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;

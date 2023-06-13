import AppLoader from "./components/hoc/appLoader";
import { NavBar } from "./components/navbar";
import { FilterProvider } from "./hooks/useFilter";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "./components/pages/productPage";
import { Footer } from "./components/footer";
import { Main } from "./layouts/main";

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
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/products/:id" element={<ProductPage />} />
              </Routes>
            </AppLoader>
          </main>
        </div>
        <Footer />
      </FilterProvider>
    </div>
  );
}

export default App;

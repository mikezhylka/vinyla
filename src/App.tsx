import { Route, HashRouter as Router, Routes } from "react-router";
import { AppProvider } from "./context/AppContext";

import { Footer } from "./components/blocks/Footer";
import { Header } from "./components/blocks/Header";
import { CartPage } from "./components/Pages/CartPage";
import { HomePage } from "./components/Pages/HomePage";
import { Menu } from "./components/Pages/Menu";
import { NotFound } from "./components/Pages/NotFound";
import { ProductPage } from "./components/Pages/ProductPage";
import { ShopPage } from "./components/Pages/ShopPage";

const App: React.FC = () => (
  <AppProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/genres/:genre" element={<ShopPage />} />
        <Route path="/shop/pages/:page" element={<ShopPage />} />
        <Route path="/shop/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  </AppProvider>
);

export default App;

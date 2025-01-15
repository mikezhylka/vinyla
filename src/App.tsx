import { Route, HashRouter as Router, Routes } from "react-router";
import { AppProvider } from "./contexts/App/AppContext";

import { Footer } from "./components/blocks/Footer";
import { Header } from "./components/blocks/Header";
import { CartPage } from "./components/pages/Cart";
import { HomePage } from "./components/pages/Home";
import { Menu } from "./components/pages/Menu";
import { NotFound } from "./components/pages/NotFound";
import { ProductPage } from "./components/pages/Product";
import { ShopPage } from "./components/pages/Shop";
import { CartProvider } from "./contexts/Cart/CartContext";
import { ProductProvider } from "./contexts/Product/ProductContext";

const App: React.FC = () => (
  <AppProvider>
    <ProductProvider>
      <CartProvider>
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
      </CartProvider>
    </ProductProvider>
  </AppProvider>
);

export default App;

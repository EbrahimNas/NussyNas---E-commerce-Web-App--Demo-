import AllRoutes from "./Routes/AllRoutes.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LikedItemsProvider } from './context/LikedItemsContext';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import AuthProvider  from "./context/AuthContext.js";


function App() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (

      <AuthProvider>
        <LikedItemsProvider>
          <CartProvider>
            <ProductsProvider>
              <div>
                <AllRoutes />
              </div>
            </ProductsProvider>
          </CartProvider>
        </LikedItemsProvider>
      </AuthProvider>
      
        
    );
};

export default App;
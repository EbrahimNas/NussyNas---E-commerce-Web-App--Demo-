import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute.js'
import Home from '../components/Home.js';
import Abaya from '../components/Abaya.js';
import Dresses from '../components/Dresses.js';
import Accessories from '../components/Accessories.js';
import SearchResults from '../components/SearchResults.js';
import Access from '../components/Access.js';
import LikedItems from '../components/LikedItems.js';
import Bag from '../components/Bag.js';
import OrderSummary from '../components/OrderSummary.js';
import ProductDetails from '../components/ProductDetails.js';
import UserAccount from '../components/UserAccount.js';
import UserDetails from '../components/UserDetails.js';
import OrderConfirmation from '../components/OrderConfirmation.js';
import OrderHistory from '../components/OrderHistory.js';
import LoginReset from '../components/LoginReset.js';

function AllRoutes() {

    return (
        <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/abayas" element={<Abaya />} />
              <Route path="/dresses" element={<Dresses />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/access" element={<Access />} />
              <Route path="/loginReset" element={<LoginReset />} />
              <Route path="/likedItems" element={<ProtectedRoute><LikedItems /></ProtectedRoute>} />
              <Route path="/bag" element={<ProtectedRoute><Bag /></ProtectedRoute>} />
              <Route path="/orderSummary" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
              <Route path="/product/:name/:id" element={<ProductDetails/>} />
              <Route path="/userAccount" element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
              <Route path="/userDetails" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
              <Route path="/orderConfirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
              <Route path="/orderHistory" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            </Routes>
        </div>
    );
};

export default AllRoutes;
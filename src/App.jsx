import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import Main from "./components/main/Main";
import Home from "./components/home/Home";
import Aside from "./components/aside/Aside";
import Cart from "./components/cart/Cart"; 
import Login from "./pages/login/Login";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import ProfilePage from "./pages/profile/Profile";
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  
  const user = useSelector((state) => state.user.userData);

  return (
    <Provider store={store}>
      <Router>
          <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
            <nav className="flex justify-between items-center">
              <ul className="flex items-center space-x-4">
                <li><Link to="/" className="hover:text-gray-400">Gadgets</Link></li>
                {/* <li><Link to="/home" className="hover:text-gray-400">Home</Link></li> */}
                  <li><Link to="/profile" className="hover:text-gray-400 flex justify-center items-center gap-1"><FaUserCircle/> Profile</Link></li>
                <li>
                  <select 
                    name="price"
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All</option>
                    <option value="cheap">Cheap</option>
                    <option value="expensive">Expensive</option>
                  </select>
                </li>
              </ul>
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-white" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>

            </nav>
          </header>
          <div > 
            <Routes>
            <Route path="login" element={<Login />} />
              <Route path="/" element={
                <div className="main-wrapper flex">
                  <Aside
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                  <Main
                    selectedBrand={selectedBrand}
                    selectedColor={selectedColor}
                    sortBy={sortBy}
                  />
                </div>
              } />
              {/* <Route path="/home" element={<Home />} /> */}

              <Route element={<ProtectedRoute/>}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
      </Router>
    </Provider>
  );
}
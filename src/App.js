import { useState, useEffect } from 'react';
import './App.css';
import Home from './page/Home';
import AddProducts from './page/AddProducts';
import Login from './page/Login';
import PageNotFound from './page/PageNotFound';
import Products from './page/Products';
import UpdateProduct from './page/UpdateProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';
import Profile from './page/Profile';



function App() {
  // đọc thông tin user từ localStorage
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  // lưu thông tin user vào localStorage
  const saveUserInfoToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }
  // state user
  const [user, setUser] = useState(getUserInfoFromLocalStorage());

  // các route không cần login
  const PublicRoute = () => {
    if (user) { // nếu đã login thì cho vào trang chủ
      return <Navigate to="/" />
    }
    return <Outlet />
  }

  // các route cần login
  const PrivateRoute = () => {
    if (!user) { // nếu chưa login thì cho vào trang login
      return <Navigate to="/login" />
    }
    return <Outlet />
  }

  return (
    <Router>
      <Routes>
        <Route element = {<PublicRoute/>}>
          <Route path='/login' element={<Login saveUserInfo = {saveUserInfoToLocalStorage} />} />
        </Route>
        <Route element = {<PrivateRoute/>}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/add' element={<AddProducts />} />
          <Route path='/products/update/:id' element={<UpdateProduct />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

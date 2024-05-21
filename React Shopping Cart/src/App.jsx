import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage.jsx';

import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import { UserDataProvider } from './contexts/todoContext/UseContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import CartPage from './pages/CartPage.jsx';
import store from './redux/store/store.js';


function App() {
  

  return (
    <>
    <Provider store={store}>
    <UserDataProvider>
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="productdetails/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
    
    </UserDataProvider>
    </Provider>
    <ToastContainer/>
    </>
  );
}

export default App

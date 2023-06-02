
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Components
import { Header, Footer } from './components'
// Pages
import { Home, Contact, Login, Register, Reset, Admin,Cart } from './pages'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/ProductDetails/ProductDetails';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
function App() {

  return (
    < >
      <BrowserRouter>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-details' element={<CheckoutDetails />}/>

          <Route path='/checkout' element={<Checkout />}/>
          
       
        </Routes>




        <Footer />


      </BrowserRouter>

    </>
  );
}

export default App;

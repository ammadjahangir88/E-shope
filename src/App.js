
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Components
import { Header, Footer } from './components'
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from './pages'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
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


        </Routes>




        <Footer />


      </BrowserRouter>

    </>
  );
}

export default App;

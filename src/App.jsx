import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NavbarCmp from './components/Navbar'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound'
import Checkout from './components/checkout'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Orders from './pages/admin/Orders'
import Dashbar from './pages/admin/Dashbar'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import ProductsList from './pages/admin/adminComponents/ProductsList'
import Product from "./pages/admin/details/Product"
import Order from "./pages/admin/details/Order"
import UserProfile from "./pages/admin/details/UserProfile"


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div className='p-1 sticky-top'>
     <NavbarCmp/>
     </div>

<ToastContainer position='bottom-right' />
     
     <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/cart'  element={<Cart/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/Register'  element={<Register/>}/>
      <Route path='/checkout-success'  element={<Checkout/>}/>
      <Route path='/product/:id'  element={<Product/>}/>
      <Route path='/order/:id'  element={<Order/>}/>
      <Route path='/user/:id'  element={<UserProfile/>}/>


{/* admin Routes */}

      <Route path='/admin'  element={<Dashbar/>}>
      <Route path='dashboard'  element={<Dashboard/>} />
      <Route path='products'  element={<Products/>}>
      <Route index element={<ProductsList/>} />
      <Route path='create-product'  element={<CreateProduct/>} />
      </Route>
      <Route path='users' element={<Users/>} />
      <Route path='orders'  element={<Orders/>}/>
      </Route>

{/* admin end */}


      <Route path='*' element={<NotFound/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}




// https://average-gown-eel.cyclic.app/





export default App

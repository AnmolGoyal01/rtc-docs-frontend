import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent.js';
import Login from './Components/Login';
// import AddProduct from './Components/AddProduct';
// import ProductList from './Components/ProductList';
// import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className='header'>
          <h1>Welcome To Collab-Desk</h1>
          
        </div>
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* <Route path="/" element={<ProductList />} /> */}
            {/* <Route path="/add-product" element={<AddProduct />} /> */}
            {/* <Route path="/update/:id" element={<UpdateProduct />} /> */}

            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile component</h1>} />
          </Route>

          <Route path="/login" element={<h1><Login /></h1>} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

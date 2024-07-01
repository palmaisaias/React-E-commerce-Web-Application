import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import CustomerList from './CustomerList.jsx';
import CustomerForm from './CustomerForm.jsx';
import CustomerDetails from './CustomerDetails.jsx';
import UpdateCustomerForm from './UpdateCustomerForm.jsx';
import ProductList from './ProductList.jsx';
import AddProductForm from './AddProductForm.jsx';
import UpdateProductForm from './UpdateProductForm.jsx';
import PlaceOrderForm from './PlaceOrderForm.jsx';
import OrderDetails from './OrderDetails.jsx';
import OrderLookup from './OrderLookup.jsx';
import CustomNavbar from './CustomNavbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// implementing the use of BrowseRouter to implement Router and connect all of the paths
// the use of the Routes component allows the management and defenition of different routes in the app

const App = () => {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/:id/edit" element={<UpdateCustomerForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/products/:id/edit" element={<UpdateProductForm />} />
          <Route path="/place-order" element={<PlaceOrderForm />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/order-lookup" element={<OrderLookup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrderForm.css';

// this components works with quite a few states since the component pulls all the customers and products and then has to keep track of which customer it the one selecting an item or items
// 
const PlaceOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // we didnt end up doing the customer validation so this just provides a list of customers for the user to select from. Not very realistic but it works
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    // pulls all the products
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  // this one handles product selection. When a product is clicked, the selectedProducts array is updated
  // it checks the previously selected items and checks the id of the selected item to see if its in the prev. If it
  // is, it removes it, if its not, it creates a new array with the prev items + the product id of the selected
  const handleProductClick = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // parseInt to turn the values into integers
    const newOrder = {
      customer_id: parseInt(selectedCustomer),
      items: selectedProducts.map((product) => parseInt(product))
    };

    try {
      // creates the post to the backend, this info is save in mySQL database. We used Postman in backend database building and this portion made it click because it looks similar to the verbiage on Postman
      const response = await fetch('http://127.0.0.1:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      // if it goes through successfully, the program will link to the OrderDetails endpoint
      if (response.ok) {
        const orderData = await response.json();
        navigate(`/orders/${orderData.id}`);
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className='new-order-back'>
    <div className="place-order-form-container">
      <h1>Place Your Order!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Members:</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">Select your name!</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customer_name}
              </option>
            ))}
          </select>
        </div>
        <h2>Not on the list? Click 'Sign Up' and become a member today!</h2>
        <div className="form-group">
          <label>Products:</label>
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                onClick={() => handleProductClick(product.id)}
              >
                <h3>{product.product_name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <button className='place-ord' type="submit">Place Order</button>
      </form>
      <button onClick={() => navigate('/orders')} className="return-button">
        Return to Order List
      </button>
    </div>
    </div>
  );
};

export default PlaceOrderForm;

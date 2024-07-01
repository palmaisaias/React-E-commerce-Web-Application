import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddProductForm.css';

// takes the events presented by the user, in this case price and product name, formats them for the back end and creates a POST request to add the item to the database

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      product_name: productName,
      price: parseFloat(price)
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        navigate('/products');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-form-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
        <Link to="/products">
            <button className="return-button">Return to Product List</button>
        </Link>
      </form>
    </div>
  );
};

export default AddProductForm;

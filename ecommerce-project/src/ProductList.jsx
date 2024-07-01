import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // fetches all products from the back end
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // diplays all the products in 'boxes' but also links each one of those to the edit endpoint which allows the user to update the name and price OR Delete the item outright
  return (
    <div className="product-list-container">
      <div className="product-list">
        <h1>Our Products</h1>
        <h3>Click on the item to Update or Delete</h3>
        <Link to="/add-product">
          <button className="add-product-button">Add New Product</button>
        </Link>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}/edit`}>
                <h2>{product.product_name}</h2>
                <p>${product.price.toFixed(2)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductConfirmationModal from './ProductConfirmationModal';
import './UpdateProductForm.css';

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
        const data = await response.json();
        setProductName(data.product_name);
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      product_name: productName,
      price: parseFloat(price)
    };

    setModalMessage('Are you sure you want to update this product?');
    setConfirmAction(() => async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          navigate('/products');
        } else {
          console.error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    });
    setShowModal(true);
  };

  const handleDelete = () => {
    setModalMessage('Are you sure you want to delete this product?');
    setConfirmAction(() => async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          navigate('/products');
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  const handleConfirm = async () => {
    if (confirmAction) await confirmAction();
    setShowModal(false);
  };

  return (
    <div className="update-product-form-container">
      <h1>Update Product</h1>
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
        <button className='update-prod-onlist' type="submit">Update Product</button>
        
      </form>
      <button onClick={handleDelete} className="delete-button">Delete Product</button>
      <Link to="/products">
        <button className="return-button">Return to Product List</button>
      </Link>

      <ProductConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        message={modalMessage}
      />
    </div>
  );
};

export default UpdateProductForm;

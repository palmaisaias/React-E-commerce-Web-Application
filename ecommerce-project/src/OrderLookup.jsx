import React, { useState } from 'react';
import './OrderLookup.css';

// this component pulls order details when an order number is entered. It pulls and displays the orer date and the items in that order

const OrderLookup = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}/track`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data);
        setError('');
      } else {
        setOrder(null);
        setError(data.Error);
      }
    } catch (error) {
      setOrder(null);
      setError('Failed to fetch order information.');
    }
  };

  return (
    <div className='order-look-back'>
    <div className="order-lookup-container">
      <h1>Order Tracking and Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Lookup Order</button>
      </form>
      {error && <p className="error">{error}</p>}
      {order && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {order.order_id}</p>
          <p><strong>Order Date:</strong> {order.order_date}</p>
          <p><strong>Estimated Delivery In:</strong> 4 days</p>
          <h3>Items</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderLookup;

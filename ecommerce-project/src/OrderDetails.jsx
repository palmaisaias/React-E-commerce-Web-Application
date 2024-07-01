import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = () => {
  // useParams to extract the dynamic portion of the url, in this case the ID
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/order_items/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    // ensures the correct details are fetched when the id number changes, this handles the ability of displaying multiple item details after the user 'orders' multiple items in one order
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Please wait while we fetch everything you spent your money on</div>;
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      <h2>Order Number</h2>
      <h1>{id}</h1>
      <p>Order Items:</p>
      <ul>
        {order.map((product) => (
          <li key={product.id}>
            <h3>{product.product_name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <Link to="/place-order">
        <button className="return-button-det">Continue Shopping!</button>
      </Link>
    </div>
  );
};

export default OrderDetails;

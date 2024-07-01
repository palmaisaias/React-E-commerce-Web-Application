import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = ({ refresh }) => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const url = `http://127.0.0.1:5000/customers`;
      const response = await fetch(url);
      const data = await response.json();
      // checks if the info being returned is in an array as expected, if its not,the customer state is set to an empty array
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
    // Re-fetch customers when refresh changes or when the component mounts
  }, [refresh]); 

  return (
  <div className="customer-list-background">
    <div className="customer-list-container">
      <h1>Members</h1>
      <h3>Click 'Sign Up' in the menu to become a member today!</h3>
      <h5>Click on customer name for details</h5>
      <ol>
        {customers.map(customer => (
          <li key={customer.id}>
            <Link to={`/customers/${customer.id}`}>{customer.customer_name}</Link>
          </li>
        ))}
      </ol>
    </div>
  </div>
  );
};

export default CustomerList;

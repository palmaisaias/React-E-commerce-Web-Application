import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCustomerForm.css';

// this component pushes changes to the customers. first the customer is fetched from the database based on id and then the edits are put into the proper format to be pushed to the backend

const UpdateCustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    customer_name: '',
    email: '',
    phone: ''
  });

  const fetchCustomerDetails = async () => {
    try {
      const url = `http://127.0.0.1:5000/customers/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCustomer(data);
      } else {
        console.error('Failed to fetch customer details:', data);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://127.0.0.1:5000/customers/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/customers');
        console.log('Customer updated successfully:', data);
      } else {
        console.error('Failed to update customer:', data);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-customer-form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="customer_name"
          value={customer.customer_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Customer</button>
    </form>
  );
};

export default UpdateCustomerForm;

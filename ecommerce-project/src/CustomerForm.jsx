import React, { useState } from 'react';
import './CustomerForm.css';

// this sets the original state of the form as having 3 emplty fields
const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    customer_name: '',
    email: '',
    phone: ''
  });

  // takes in the event. e.target is the DOM element, in this case the input field. We take the name and value from the target
  const handleChange = (e) => {
    const { name, value } = e.target;
    // use the spread operator to take the current values of customer which are set to empty. They are then replaced by the value entered in each 'name' field on the form. in thica case 'name', 'email' and 'phone'
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    // prevents the default form submission which is to refresh. So we basically pass the event and then call for the prevent 
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      const data = await response.json();
      if (response.ok) {
        // clears the form after the post has been successful 
        setCustomer({ customer_name: '', email: '', phone: '' });
        console.log('Customer added successfully:', data);
      } else {
        console.error('Failed to add customer:', data);
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className='customer-form-background'>
      <h1>Become a member!</h1>
      <h5>Join the shopping fun</h5>
    <form onSubmit={handleSubmit}>
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
      <button className='join-button' type="submit">Join!</button>
    </form>
    </div>
  );
};

export default CustomerForm;

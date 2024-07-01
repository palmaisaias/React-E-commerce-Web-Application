import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CustomerDetails.css';
import ConfirmationModal from './ConfirmationModal';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // fetches customer details by id. the id is dicated by what customer name is clicked on the '/customers' endpoint which is my 'Our Members' page
  const fetchCustomerDetails = async () => {
    try {
      const url = `http://127.0.0.1:5000/customers/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCustomer(data);
      } else {
        setCustomer(null);
        console.error('Failed to fetch customer details:', data);
      }
    } catch (error) {
      setCustomer(null);
      console.error('Error fetching customer details:', error);
    }
  };

    // runs the function as soon as the component is mounted. Details will be fetched when the page is loaded OR when the ID i the url changes
  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  // this executes the delete request, and removes the customer details from my mySQL workbench database
  const deleteCustomer = async () => {
    try {
      const url = `http://127.0.0.1:5000/customers/${id}`;
      const response = await fetch(url, {
        method: 'DELETE'
      });

      if (response.ok) {
        navigate('/customers');
        console.log('Customer deleted successfully');
      } else {
        console.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // struggled with modals because it feels like they add another layer. These basically handle the users selection. Either they decide to go through with the deletion or they click cancel and the modal goes away 
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCustomer();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-details-container">
      <h1>Customer Details</h1>
      <p><strong>Name:</strong> {customer.customer_name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <button className='return-to-list' onClick={() => navigate('/customers')}>Return to List</button>
      <Link to={`/customers/${customer.id}/edit`}>
        <button className='edit-button'>Edit Customer</button>
      </Link>
      <button className='delete-button-details' onClick={handleDeleteClick}>Delete Customer</button>

      <ConfirmationModal
        show={showModal}
        message="Are we tossin' this name in the ol' trash can?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default CustomerDetails;

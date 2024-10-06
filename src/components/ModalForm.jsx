import React, { useEffect, useState } from 'react';
import { formInputs, validateForm } from '../utils/constant';
import axios from 'axios';

const ModalForm = ({ toggleButton, handleAddUser,handleUpdateUser, editData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });
  const [error, setError] = useState({});

  useEffect(()=>{
    if(editData){
      setFormData({
        id : editData.id ||'',
        name: editData.name||'',
        email: editData.email||'',
        phone: editData.phone||'',
        username:editData.username||'',
        address: { street: editData.address.street||'', city: editData.address.city||''},
        company: { name: editData.company.name||''},
        website: editData.website||''
      })
    }
  }, [editData])

  //To input the data in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city') {
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else if (name === 'companyName') {
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, name: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

//submit the data after inputting in the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    const validationErrors = validateForm(formData);
    setError(validationErrors);
    console.log('Validation errors', validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (editData) {
          console.log('Updating user');
          const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editData.id}`, formData);
          console.log('User updated', response.data);
          handleUpdateUser(response.data);
        } else {
          console.log('Adding new user');
          const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
          console.log('New user created:', response.data);
          handleAddUser(response.data);
        }
        toggleButton();
      } catch (error) {
        console.error("Error saving user:", error);
        setError(prev => ({ ...prev, submit: "Failed to save user. Please try again." }));
      }
    } else {
      console.log('Validation failed', validationErrors);
    }
  };
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block position-fixed top-50 start-50 translate-middle" 
           style={{ zIndex: 1050, maxWidth: '600px' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header bg-info text-white rounded-top">
              <h5 className="modal-title">{editData ? 'Edit User' : 'Add New User'}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={toggleButton}></button>
            </div>
            
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                {formInputs.map(({ id, type, label, name }) => {
                  if (name === 'address') {
                    return (
                      <div key={id}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className={`form-control ${error.address ? 'is-invalid' : ''}`}
                            id="street"
                            name="street"
                            value={formData.address.street}
                            placeholder="Street"
                            onChange={handleChange}
                          />
                          <label htmlFor="street">Street</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className={`form-control ${error.address ? 'is-invalid' : ''}`}
                            id="city"
                            name="city"
                            value={formData.address.city}
                            placeholder="City"
                            onChange={handleChange}
                          />
                          <label htmlFor="city">City</label>
                          {error.address && <div className='invalid-feedback'>{error.address}</div>}
                        </div>
                      </div>
                    );
                  } else if (name === 'companyName') {
                    return (
                      <div className="form-floating mb-3" key={id}>
                        <input
                          type={type}
                          className={`form-control ${error.company ? 'is-invalid' : ''}`}
                          id={id}
                          name={name}
                          value={formData.company.name}
                          placeholder={label}
                          onChange={handleChange}
                        />
                        <label htmlFor={id}>{label}</label>
                        {error.company && <div className='invalid-feedback'>{error.company}</div>}
                      </div>
                    );
                  } else {
                    return (
                      <div className="form-floating mb-3" key={id}>
                        <input
                          type={type}
                          className={`form-control ${error[name] ? 'is-invalid' : ''}`}
                          id={id}
                          name={name}
                          value={formData[name]}
                          placeholder={label}
                          onChange={handleChange}
                          readOnly={editData && name === 'username'}
                        />
                        <label htmlFor={id}>{label}</label>
                        {error[name] && <div className='invalid-feedback'>{error[name]}</div>}
                      </div>
                    );
                  }
                })}
                <div className="modal-footer justify-content-between p-3">
                  <button type="button" className="btn btn-danger" onClick={toggleButton}>Close</button>
                  <button type="submit" className="btn btn-primary">{editData ? 'Update User' : 'Add User'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
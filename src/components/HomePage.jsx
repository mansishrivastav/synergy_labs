import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import ModalForm from './ModalForm';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


const HomePage = () => {
  const { data, setData, loading } = useApi();
  const [modalData, setModalData] = useState(false);
  const [editData, setEditData] = useState(null);

// To toggle the Form 
  const toggleButton = () => {
    setModalData(!modalData);
    if (modalData) {
      setEditData(null);
    }
  };

  // To add the new user
  const handleAddUser = (newUser) => {
    setData(prevData => [...prevData, newUser]);
  };

  //To update the existing users
  const handleUpdateUser = (updatedUser)=>{
   try{
    setData(prevData=>prevData.map(user=>user.id===updatedUser.id?updatedUser:user))
   }catch(err){
    console.error('Update error:', err);
   }
  }

  //To delete the users users
const handleDeleteUser =async(userId)=>{
  try{
const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
if(response.status === 200){
  setData(prevData=>prevData.filter(user=>user.id !== userId))
  console.log('User deleted successfully');
}

  }catch(err){
    console.log('Error deleting data', err);
    
  }
}
//To edit in the form for existing users to update the user's data
  const handleEditUser = (userId) => {
    const userToEdit = data.find(user => user.id === userId);
    setEditData(userToEdit);
    setModalData(true);
  };

  //To load a spinner while loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ClipLoader color="#36D7B7" size={50} />
      </div>
    );
  }

  return (
   
    <div className="d-flex flex-column align-items-center justify-content-center">
    <h1>User Details</h1>
    <button type="button" className="btn btn-info mb-3" onClick={() => {
  setEditData(null);
  toggleButton();
}}>
  Add User
</button>
    <div className="table-responsive">
      <table className="table">
        <thead className="bg-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Username</th>
            <th scope="col">Address</th>
            <th scope="col">Company Name</th>
            <th scope="col">Website</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user?.id} className={index % 2 === 0 ? 'bg-white' : 'bg-light'}>
              <td>{user?.name || 'Name not available'}</td>
              <td>{user?.email || 'Email not available'}</td>
              <td>{user?.phone ? user.phone.replace(/[^0-9]/g, '') : 'N/A'}</td>
              <td>{user?.username || 'Username not available'}</td>
              <td>
                {user?.address?.street && user?.address?.city
                  ? `${user.address.street}, ${user.address.city}`
                  : 'Address not available'}
              </td>
              <td>{user?.company?.name || 'Company Name not available'}</td>
              <td>{user?.website || 'Website not available'}</td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {modalData && 
    <ModalForm 
    toggleButton={toggleButton} 
    handleAddUser={handleAddUser} 
    handleUpdateUser={handleUpdateUser}
    editData={editData}/>}
  </div>
  );
};

export default HomePage;

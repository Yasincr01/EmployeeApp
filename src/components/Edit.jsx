import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeByIdAPI, updateEmployeeAPI } from '../services/allApi';
import { TextField, Button, MenuItem, FormControl, InputLabel } from '@mui/material';

const Edit = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [employee, setEmployee] = useState({
    userName: '',
    email: '',
    status: 'active',
  });
  const [error, setError] = useState(''); // Handle error state

  // Fetch employee data based on the ID from the URL
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeByIdAPI(id); // Call API to get employee data
        const fetchedEmployee = response.data; // Access response data
        console.log(fetchedEmployee); // Debugging: Log the fetched data

        if (fetchedEmployee) {
          // Update state with the fetched employee data
          setEmployee({
            userName: fetchedEmployee.userName || '',
            email: fetchedEmployee.email || '',
            status: fetchedEmployee.status === 'inactive' ? 'inactive' : 'active',
          });
        } else {
          setError('Employee not found');
        }
      } catch (err) {
        setError('Error fetching employee details');
        console.error('Error:', err);
      }
    };

    fetchEmployee();
  }, [id]); // Runs when the component mounts or when the ID changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email } = employee;

    // Basic validation: Check if the required fields are filled out
    if (!userName || !email) {
      setError('Please fill out all required fields');
      return;
    }

    try {
      await updateEmployeeAPI(id, employee); // Update employee via API
      alert('Employee updated successfully!');
      navigate('/home'); // Navigate back to the home page after successful update
    } catch (err) {
      setError('Error updating employee');
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div className="shadow p-4" style={{ borderRadius: '8px', backgroundColor: 'white' }}>
        <h1 className='fw-bolder mb-5' style={{ textAlign: 'center' }}>Edit Employee</h1>

        {/* Display error message if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Input for user name */}
          <div className='mb-3'>
            <TextField
              name='userName'
              label="User Name"
              fullWidth
              margin="normal"
              value={employee.userName} // Pre-populated value
              onChange={handleChange} // Update value on change
              variant="outlined"
            />
          </div>

          {/* Input for email */}
          <div className='mb-3'>
            <TextField
              name='email'
              label="Email"
              type='email'
              fullWidth
              margin="normal"
              value={employee.email} // Pre-populated value
              onChange={handleChange} // Update value on change
              variant="outlined"
            />
          </div>

          {/* Dropdown for status */}
          <div className='mb-3'>
            <FormControl fullWidth margin="normal">
              <TextField
                select
                name='status'
                value={employee.status} // Pre-populated value
                onChange={handleChange} // Update value on change
                variant="outlined"
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </FormControl>
          </div>

          {/* Submit and Cancel buttons */}
          <div className='mb-3 text-center'>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ width: '150px', height: '50px', marginRight: '20px', backgroundColor: 'blue' }}
            >
              Save
            </Button>
            <Button 
              type="button" 
              variant="contained" 
              style={{ width: '150px', height: '50px', backgroundColor: 'red' }}
              onClick={() => navigate('/home')} // Navigate back to home
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

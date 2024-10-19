import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, FormLabel } from '@mui/material';
import { uploadEmployeeAPI } from '../services/allApi';
import Header from './Header';

const Add = () => {

  // const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Validation states
 
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isStatusValid, setIsStatusValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);

  // Input validation function
  const userInputValidation = (inputData) => {
    const { name, value } = inputData;

    if (name === "id") {
      
    } else if (name === "userName") {
      setUserName(value);
      // User name must contain only letters and spaces
      setIsUserNameValid(/^[a-zA-Z\s]+$/.test(value));
    } else if (name === "email") {
      setEmail(value);
      // Email must be valid
      setIsEmailValid(/\S+@\S+\.\S+/.test(value));
    }
    
    checkFormValidity();
  };

  // Check form validity
  const checkFormValidity = () => {
    // Form is valid if all fields are filled correctly
    if (
      
      userName && isUserNameValid &&
      email && isEmailValid &&
      status // Ensure status is selected (active or inactive)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleReset = () => {
    
    setUserName("");
    setEmail("");
    setStatus("");

    
    setIsUserNameValid(true);
    setIsEmailValid(true);
    setIsStatusValid(true);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isFormValid) {
      const employeeDetails={userName,email,status}
      try
      {
        const response= await uploadEmployeeAPI(employeeDetails)
        console.log("Employee Added: ",response.data);
        
      alert("Employee added successfully!");
      handleReset();
      }
      catch(error)
      {
        console.error("Error uploading employee:", error);
        alert("Error adding employee. Please try again.");
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  return (
   <>
  <Header/>

      <div style={{ maxWidth: '500px', margin: '2rem auto',marginTop:'110px' }}>
        <div className="shadow p-4" style={{ borderRadius: '8px', backgroundColor: 'white' }}>
          <h1 className='fw-bolder mb-5' style={{ textAlign: 'center' }}>Add Employee</h1>
          <form>
           
  
            <div className='mb-3'>
              <TextField
                name='userName'
                onChange={e => userInputValidation(e.target)}
                value={userName}
                className='w-100'
                label="User Name"
                variant="outlined"
              />
              {!isUserNameValid && <div className='text-danger'>*Invalid User Name (letters and spaces only)</div>}
            </div>
  
            <div className='mb-3'>
              <TextField
                name='email'
                onChange={e => userInputValidation(e.target)}
                value={email}
                className='w-100'
                type='email'
                label="Email"
                variant="outlined"
              />
              {!isEmailValid && <div className='text-danger'>*Valid Email is Required</div>}
            </div>
  
            <div className='mb-3'>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <TextField
                  select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    // Check if status is valid
                    setIsStatusValid(true); // Set valid when a selection is made
                    checkFormValidity(); // Check form validity
                  }}
                  className='w-100'
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                {!isStatusValid && <div className='text-danger'>*Please select a status</div>}
              </FormControl>
            </div>
  
            <div className='mb-3 text-center mt-5'>
              <Button onClick={handleSubmit} disabled={!isFormValid} style={{ width: '150px', height: '50px', marginRight: '20px', backgroundColor: isFormValid ? 'blue' : 'grey' }} variant="contained">
                Add Employee
              </Button>
              <Button onClick={handleReset} style={{ width: '150px', height: '50px', backgroundColor: 'red' }} variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
   </>
  );
};

export default Add;

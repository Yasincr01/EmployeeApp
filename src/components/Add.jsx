import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, FormLabel } from '@mui/material';
import { uploadEmployeeAPI } from '../services/allApi';
import Header from './Header';

const Add = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Validation states
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isStatusValid, setIsStatusValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate inputs on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "userName") {
      setUserName(value);
      setIsUserNameValid(/^[a-zA-Z\s]+$/.test(value));
    } else if (name === "email") {
      setEmail(value);
      setIsEmailValid(/\S+@\S+\.\S+/.test(value));
    }
  };

  // Update status and validate
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    setIsStatusValid(value !== "");
  };

  // Check form validity whenever inputs change
  useEffect(() => {
    setIsFormValid(userName && isUserNameValid && email && isEmailValid && status);
  }, [userName, isUserNameValid, email, isEmailValid, status]);

  // Reset form
  const handleReset = () => {
    setUserName("");
    setEmail("");
    setStatus("");
    setIsUserNameValid(true);
    setIsEmailValid(true);
    setIsStatusValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const employeeDetails = { userName, email, status };
      try {
        const response = await uploadEmployeeAPI(employeeDetails);
        console.log("Employee Added:", response.data);
        alert("Employee added successfully!");
        handleReset();
      } catch (error) {
        console.error("Error uploading employee:", error);
        alert("Error adding employee. Please try again.");
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: '500px', margin: '2rem auto', marginTop: '110px' }}>
        <div className="shadow p-4" style={{ borderRadius: '8px', backgroundColor: 'white' }}>
          <h1 className="fw-bolder mb-5" style={{ textAlign: 'center' }}>Add Employee</h1>
          <form>
            <div className="mb-3">
              <TextField
                name="userName"
                onChange={handleInputChange}
                value={userName}
                className="w-100"
                label="User Name"
                variant="outlined"
              />
              {!isUserNameValid && <div className="text-danger">*Invalid User Name (letters and spaces only)</div>}
            </div>
            <div className="mb-3">
              <TextField
                name="email"
                onChange={handleInputChange}
                value={email}
                className="w-100"
                type="email"
                label="Email"
                variant="outlined"
              />
              {!isEmailValid && <div className="text-danger">*Valid Email is Required</div>}
            </div>
            <div className="mb-3">
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <TextField
                  select
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-100"
                  variant="outlined"
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                {!isStatusValid && <div className="text-danger">*Please select a status</div>}
              </FormControl>
            </div>
            <div className="mb-3 text-center mt-5">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                style={{ width: '150px', height: '50px', marginRight: '20px', backgroundColor: isFormValid ? 'blue' : 'grey' }}
                variant="contained"
              >
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

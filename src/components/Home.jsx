import React, { useEffect, useState } from 'react';
import { getEmployeeAPI, deleteEmployeeAPI } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const Home = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployeeAPI();
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployeeAPI(id);
        alert("Employee deleted successfully");
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Failed to delete employee");
      }
    }
  };

  return (
    <>
      <Header insideHome={true}/>

      {/* Padding added to ensure content doesn't overlap with fixed header */}
      <div className="container mt-5 pt-5 fs-5" style={{ paddingTop: '100px' }}>
        <h2 className="text-center mb-5 fw-bolder">Employee List</h2>
        <table className="table table-striped shadow">
          <thead>
            <tr>
             
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Clear</th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  
                  <td>{employee.userName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.status}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/edit/${employee.id}`)}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </button>
                    </td>
                    <td>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="btn btn-danger"
                    >
                      <i className='fa-solid fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger fw-bolder">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"


// uploadEmployee api api must called by Add component

export const uploadEmployeeAPI=async(empDetails)=>{
    return await commonAPI("POST",`${SERVER_URL}/employeeDetails`,empDetails)
}   

// getEmployeeAPI- called by Home component

export const getEmployeeAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/employeeDetails`,"")
}

// deleteEmployeeAPI - called by Home component to delete an employee
export const deleteEmployeeAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVER_URL}/employeeDetails/${id}`, "");
  };

// Update employee API call
export const updateEmployeeAPI = async (id, empDetails) => {
    return await commonAPI("PUT", `${SERVER_URL}/employeeDetails/${id}`, empDetails);
  };


  // Get a single employee by ID - called by Edit component
export const getEmployeeByIdAPI = async (id) => {
  return await commonAPI("GET", `${SERVER_URL}/employeeDetails/${id}`, "");
};

  
  
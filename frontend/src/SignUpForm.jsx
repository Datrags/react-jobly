import React, { useState } from 'react';
import "./Form.css";
function SignUpForm({signup}) {
  // Set up state for all input fields
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  //Create the handleChange function
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value 
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 
   // alert(JSON.stringify(formData, null, 2)); 
    navigate("/");
    try {
        await signup(formData)
    }
    catch (e) {
        console.log(e)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <button type="submit">Register</button>
    </form>
  );
}

export default SignUpForm;

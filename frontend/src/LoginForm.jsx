import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import './Form.css'
function LoginForm({login}) {
  // Set up state for both input fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Create the handleChange function
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Update the corresponding field
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    alert(`Username: ${formData.username}\nPassword: ${formData.password}`); // Display the input values
    try {
        await login(formData);
        console.log("Login successful");
        navigate("/");
    } catch(e) {
        console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

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
      
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

export default function Login() { 
 
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const json = await response.json();
    if (json && json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authtoken", json.authToken);
      console.log(localStorage.getItem("userEmail"))
      console.log(localStorage.getItem("authtoken"));
      console.log('Login successful!');
      navigate("/");
    } else { 
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error(error); 
  }
};



  const onChange = (event) => {
    if (event && event.target) {
      setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
  };

  return (
    <>
      <div className="container w-50" style={{"marginTop":"150px"}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </>
  )
}




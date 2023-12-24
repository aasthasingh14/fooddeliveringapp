import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          geolocation: credentials.geolocation,
        })
      })

      if (credentials.password.length < 5) {
        alert('Password should be at least 5 characters long');
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      const json = await response.json();
      console.log(json.success);
      if(json && json.success){
        navigate("/");
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
      <div className="container w-50" style={{"marginTop":"100px"}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
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
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Geolocation
            </label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}

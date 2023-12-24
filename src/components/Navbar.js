import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import Cart2 from '../screens/Cart2';

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const items = useCart();
  const navigate =  useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("authtoken");
    navigate("/")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Foody</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2" >
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authtoken"))?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                </li>
                : ""
              }
            </ul>

            {(!localStorage.getItem("authtoken"))?
                <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
              </div>
                : 
                <div className='d-flex'>
                <div className='btn bg-white text-primary mx-1' onClick={()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg='primary'>{items.length}</Badge>
                </div>
                {cartView ? <Modal onClose={()=>setCartView(false)}><Cart2></Cart2></Modal> : null}
                <div>
                  <Link className="btn bg-white text-danger mx-1" onClick={handleLogOut}>Logout</Link>
                </div>
                </div>
              }
            
          </div>
        </div>
      </nav>
    </div>
  )
}

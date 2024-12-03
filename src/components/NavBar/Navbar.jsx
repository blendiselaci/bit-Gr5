import React, { useState, useContext } from 'react';
import "./navbar.scss";
import { NavLink } from 'react-router-dom';
import logo from "../../logo.svg";
import Modal from '../Modal/Modal';
import { Context } from '../../Context/Products';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [state, dispatch] = useContext(Context);
  const [toggelMenu, setToggelMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handelChanges = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const loginUser = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://75.119.136.194/api/authentication/login", formData)
    .then((response) => {
      console.log("-----", response);
      if(response.data?.token) {
        const userToken = jwtDecode(response.data?.token)
        console.log("userToken", userToken);
        localStorage.setItem('token', response.data?.token);
        dispatch({
          type: "USER",
          payland: { username: userToken.name }
        });
        setShowLogin(false);
      } else {
        setError(response.data?.error);
        setTimeout(() => {
          setError();
        }, 5000);
      }
    }).catch((err) => console.log("err", err))
  }
  const logOut = () => {
    dispatch({
      type: "USER",
      payland: { username: '' }
    });
    localStorage.removeItem('token');
  }

  return (
    <div className={`nav ${toggelMenu ? "open" : ""}`}>
      <img src={logo} alt='' height="40px" />
      <ul>
        <li>
          <NavLink onClick={() => setToggelMenu(false)} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setToggelMenu(false)} to="/students">Students</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setToggelMenu(false)} to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setToggelMenu(false)} to="/authors">Authors</NavLink>
        </li>
        <li>
          <NavLink onClick={() => setToggelMenu(false)} to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          {
            state.username ? (
              <button
                type="button"
                onClick={() => logOut()}
              >
                {state.username} "Log out"
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )
          }
        </li>
      </ul>
      <button className="btn-menu" onClick={() => setToggelMenu(!toggelMenu)}>
        <svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Icon-Set-Filled" transform="translate(-212.000000, -888.000000)" fill="#000000">
              <path d="M230,904 L214,904 C212.896,904 212,904.896 212,906 C212,907.104 212.896,908 214,908 L230,908 C231.104,908 232,907.104 232,906 C232,904.896 231.104,904 230,904 L230,904 Z M230,896 L214,896 C212.896,896 212,896.896 212,898 C212,899.104 212.896,900 214,900 L230,900 C231.104,900 232,899.104 232,898 C232,896.896 231.104,896 230,896 L230,896 Z M214,892 L230,892 C231.104,892 232,891.104 232,890 C232,888.896 231.104,888 230,888 L214,888 C212.896,888 212,888.896 212,890 C212,891.104 212.896,892 214,892 L214,892 Z" id="hamburger">
              </path>
            </g>
          </g>
        </svg>
      </button>
      <Modal
        isOpen={showLogin}
        title="Login"
        close={() => setShowLogin(false)}
      >
        <form onSubmit={loginUser}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email" name="email"
              onChange={handelChanges}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handelChanges}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </Modal>
    </div>
  )
}

export default Navbar
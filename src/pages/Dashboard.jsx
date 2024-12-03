import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Token from '../utils/Token';

const Dashboard = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios.get("http://75.119.136.194/api/users/allUsers",{
      headers: {
        token: Token().activeToken,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response);
    }).catch((err) => console.log(err))
  }, []);
  return (
    <div className="dashboard">
      <Link to="/dashboard/add">Add user</Link>

      <h3>Users</h3>
      <div className="users">

      </div>
    </div>
  )
}

export default Dashboard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./style.scss";
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';

const StudentsContent = () => {
  const [students, setStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  const confirmBtn = () => {
    console.log("confirmBtn");
    axios.delete(`http://75.119.136.194/api/student/delete?id=${selectedStudent?.id}`)
    .then((res)=> {
      console.log(res);
      setSelectedStudent();
      getStudnets();
    });
  }

  const getStudnets = () => {
    axios.get("http://75.119.136.194/api/student/all")
    .then((res) => {
        console.log("res", res);
        setStudents(res.data);
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    getStudnets();
  }, []);
  return (
    <div className="relative">
      <Link className='btn-add' to="/students/add">Add</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>E-mail</th>
            <th>Text</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            students?.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.fullName}</td>
                <td>{el.email}</td>
                <td>{el.text}</td>
                <td>{el.phone}</td>
                <td>
                  <Link to={`/students/update/${el.id}`}>Update</Link>
                  <button onClick={() => setSelectedStudent(el)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal
        isOpen={selectedStudent}
        title="Confirm"
        message={`Are u sure want to delete this Student "${selectedStudent?.fullName}"?`}
        confirmBtn={confirmBtn}
        close={() => setSelectedStudent()}
      />
    </div>
  )
}

export default StudentsContent;

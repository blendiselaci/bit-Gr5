import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    description: "",
    state: "",
    email: "",
    img: "",
  });
  const [disabledBtn, setDisabledBtn] =  useState(false);
  const { idja } = useParams();

  const navigate = useNavigate();

  const handelChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const saveStudent = (event) => {
    event.preventDefault();
    setDisabledBtn(true);
    console.log("formData", formData);
    if (idja) {
      axios.put("http://75.119.136.194/api/student/update", formData)
      .then((res) => {
        console.log("res", res);
          navigate("/students");
      }).catch((err) => console.log(err));
    } else {
      axios.post("http://75.119.136.194/api/student/create", formData)
      .then((res) => {
        console.log("res", res);
        if(res.data.status === 1) {
          alert(res.data.msg);
          navigate("/students");
        } else {
          alert(res.data.errMsg.name);
          setDisabledBtn(false);
        }
      }).catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (idja) {
      axios.get(`http://75.119.136.194/api/student/one?id=${idja}`)
      .then((res) => {
        console.log(res);
        setFormData({
          ...res.data,
          description: res.data.text
        });
      })
    }
  }, [idja])

  return (
    <div>
      <h2>{idja ? "Update Student" : "Add Student"}</h2>
      <form onSubmit={saveStudent}>
        <div className="form-group">
          <label>Full name</label>
          <input
            value={formData?.fullName}
            type="text"
            name="fullName"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>E-email</label>
          <input
            value={formData?.email}
            type="email"
            name="email"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            value={formData?.phone}
            type="text"
            name="phone"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            value={formData?.description}
            type="text"
            name="description"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            value={formData?.state}
            type="text"
            name="state"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>IMG url</label>
          <input
            value={formData?.img}
            type="text"
            name="img"
            onChange={handelChanges}
          />
        </div>
        <button
          type='submit'
          disabled={disabledBtn}
          >
            {idja ? "Update" : "Save"}
        </button>
      </form>
    </div>
  )
}

export default AddStudent;
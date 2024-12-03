import React from 'react';

const AddUser = () => {
  const handelChanges = (e) => {
    console.log(e);
  }

  const saveUser = (e) => {
    e.preventDefault();

  }
  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={saveUser}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>Last name:</label>
          <input
            type="text"
            name="last_name"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>E=mail:</label>
          <input
            type="text"
            name="email"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={handelChanges}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            onChange={handelChanges}
          >
            <option value="active" selected>Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <label>Roli</label>
          <select
            name="role"
            onChange={handelChanges}
          >
            <option value="addmenager" selected>Menager</option>
            <option value="addagent">Agent</option>
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddUser;

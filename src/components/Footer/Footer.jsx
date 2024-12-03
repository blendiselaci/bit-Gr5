import React, { useContext } from 'react';
import { Context } from '../../Context/Products';

const Footer = () => {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="footer">
      <p>Copyright 2024 @ BitAcademy</p>
      {state.username && <p>User: {state.username}</p>}
    </div>
  )
}

export default Footer;

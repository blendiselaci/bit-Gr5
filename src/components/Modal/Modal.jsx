import React from 'react';
import "./modal.scss";

const Modal = (props) => {
  const { isOpen, title, message, confirmBtn, close, children, showConfrimBtn } = props; 

  if (isOpen) {
    return (
      <div className='modal'>
        <div className='content-modal'>
          {title && <h3>{title}</h3>}
          {message && <p>{message}</p>}
          {children}
          {showConfrimBtn && <button onClick={() => confirmBtn()}>Ok</button>}
          <button onClick={() => close()}>Cancel</button>
        </div>
      </div>
    )
  }
  return;
}

export default Modal;

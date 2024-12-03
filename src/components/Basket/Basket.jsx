import React, { useContext, useState } from 'react';
import "./basket.scss";
import Modal from '../Modal/Modal';
import { Context } from '../../Context/Products';

const Basket = () => {
  const [state, dispatch] = useContext(Context);
  const [openBasket, setOpenBasket] = useState(false);

  const removeItem = (id) => {
    let items = state.basket.filter((obj) => obj.id !== id);
    dispatch({
      type: "BASKET",
      payland: { basket: items }
    });
  }
  return (
    <div className='basket'>
      <svg onClick={() => setOpenBasket(true)} fill="#000000" width="30px" height="30px" viewBox="0 0 32 32">
        <path d="M31.739 8.875c-0.186-0.264-0.489-0.422-0.812-0.422h-21.223l-1.607-5.54c-0.63-2.182-2.127-2.417-2.741-2.417h-4.284c-0.549 0-0.993 0.445-0.993 0.993s0.445 0.993 0.993 0.993h4.283c0.136 0 0.549 0 0.831 0.974l5.527 20.311c0.12 0.428 0.511 0.724 0.956 0.724h13.499c0.419 0 0.793-0.262 0.934-0.657l4.758-14.053c0.11-0.304 0.064-0.643-0.122-0.907zM25.47 22.506h-12.046l-3.161-12.066h19.253zM23.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5zM14.5 26.504c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5c0-1.381-1.119-2.5-2.5-2.5z"></path>
      </svg>
      <Modal
        isOpen={openBasket}
        close={() => setOpenBasket(false)}
        title="Favorite Authors"
      >
        {
          state.basket.length ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Note</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  state.basket.map((el) => (
                    <tr key={el.id}>
                      <td>{el.person}</td>
                      <td>{el.description}</td>
                      <th><button onClick={() => removeItem(el.id)}>Remove</button></th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <p>No favorite authors!</p>
          )
        }
      </Modal>
    </div>
  )
}

export default Basket
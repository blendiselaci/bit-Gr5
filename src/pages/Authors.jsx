import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import "./authors.scss";
import { Context } from '../Context/Products';

const Authors = () => {
  const [state, dispatch] = useContext(Context);
  const [authors, setAuthors] = useState();
  const avatarImg = "https://cdn-icons-png.freepik.com/512/6858/6858569.png";

  const addToFavorite = (e) => {
    console.log(e);
    let newItems
    if (state.basket.find(obj => obj === e)) {
      newItems = state.basket.filter((obj) => (obj !== e))
    } else {
      newItems = [...state.basket, e];
    }
    dispatch({
      type: "BASKET",
      payland: { basket: newItems }
    });
    console.log(newItems);
  }

  useEffect(() => {
    axios.get("https://example-data.draftbit.com/authors")
    .then((response) => {
      console.log(response.data);
      setAuthors(response.data);
    }).catch((err) => console.log(err))
  }, []);
  return (
    <div>
      <h3>Authors</h3>
      <div className="row">
        {authors?.map((el) => (
          <div className="col-4">
            <div className='card'>
              <img
                src={el.imgUrl} alt={el.person}
                onError={(e) =>
                  e.target.src = avatarImg
                }
              />
              <h4>{el.person}</h4>
              <p>{el.description}</p>
              <a href={el.sourceUrl} target='_Blank'>Read more!</a>
              <button onClick={() => addToFavorite(el)}>Add to Favorite</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Authors;

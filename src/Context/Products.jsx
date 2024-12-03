import React, { createContext, useReducer } from 'react'
import Reducer from './Reducer';
import Token from '../utils/Token';

const initalState = {
  username: Token().name,
  basket: [],
};

const Products = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initalState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export const Context = createContext(initalState);

export default Products
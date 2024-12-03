const Reducer = (state, action) => {

  switch (action.type) {
    case "USER":
      return ({
        ...state,
        username: action.payland.username
      });
    case "BASKET":
      return ({
        ...state,
        basket: action.payland.basket
      });
    default:
      return state;
  }
}

export default Reducer;

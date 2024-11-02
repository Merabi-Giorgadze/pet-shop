import { ADD_TO_WISHLIST } from './actions';

const initialState = {
  wishlist: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    default:
      return state;
  }
};

export default cardReducer;

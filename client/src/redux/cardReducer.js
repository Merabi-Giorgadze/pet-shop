import { ADD_TO_WISHLIST } from './actions';

const initialState = {
  wishlist: [], // New state for wishlist
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload], // Add the animal to the wishlist
      };
    default:
      return state;
  }
};

export default cardReducer;

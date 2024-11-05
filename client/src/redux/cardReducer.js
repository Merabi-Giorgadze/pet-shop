import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './actions';

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const exists = state.wishlist.some(item => item._uuid === action.payload._uuid);
      if (exists) {
        return state;
      }
      const updatedWishlistAfterAdd = [...state.wishlist, action.payload];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlistAfterAdd));
      return {
        ...state,
        wishlist: updatedWishlistAfterAdd,
      };

    case REMOVE_FROM_WISHLIST:
      const updatedWishlistAfterRemove = state.wishlist.filter(item => item._uuid !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlistAfterRemove));
      return {
        ...state,
        wishlist: updatedWishlistAfterRemove,
      };

    default:
      return state;
  }
};

export default cardReducer;

// rootReducer.js
import { combineReducers } from 'redux';
import animalReducer from './animalReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  animal: animalReducer, // Manages selected animals
  wishlist: cardReducer,  // Manages wishlist
});

export default rootReducer;

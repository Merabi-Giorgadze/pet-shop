import { combineReducers } from 'redux';
import animalReducer from './animalReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  animal: animalReducer,
  wishlist: cardReducer,
});

export default rootReducer;

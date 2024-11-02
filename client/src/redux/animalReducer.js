import { ADD_ANIMAL, REMOVE_ANIMAL } from './actions';

const initialState = {
  selectedAnimals: JSON.parse(localStorage.getItem('selectedAnimals')) || [],
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANIMAL:
      const exists = state.selectedAnimals.some(animal => animal._uuid === action.payload._uuid);
      if (exists) {
        return state;
      }
      const updatedAnimalsAfterAdd = [...state.selectedAnimals, action.payload];
      localStorage.setItem('selectedAnimals', JSON.stringify(updatedAnimalsAfterAdd));
      return {
        ...state,
        selectedAnimals: updatedAnimalsAfterAdd,
      };

    case REMOVE_ANIMAL:
      const updatedAnimalsAfterRemove = state.selectedAnimals.filter(animal => animal._uuid !== action.payload);
      localStorage.setItem('selectedAnimals', JSON.stringify(updatedAnimalsAfterRemove));
      return {
        ...state,
        selectedAnimals: updatedAnimalsAfterRemove,
      };

    default:
      return state;
  }
};

export default animalReducer;

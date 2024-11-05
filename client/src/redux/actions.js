export const ADD_ANIMAL = 'ADD_ANIMAL';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_ANIMAL = 'REMOVE_ANIMAL';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const addAnimal = (animal) => ({
  type: ADD_ANIMAL,
  payload: animal,
});

export const addToWishlist = (animal) => ({
  type: ADD_TO_WISHLIST,
  payload: animal,
});

export const removeAnimal = (animalId) => ({
  type: REMOVE_ANIMAL,
  payload: animalId,
});

export const removeFromWishlist = (animalId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: animalId,
});

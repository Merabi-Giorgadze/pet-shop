import { createStore } from 'redux';
import rootReducer from './rootReducer'; // Combine reducers

const store = createStore(rootReducer); // Create store with rootReducer

export default store;

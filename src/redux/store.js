import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer'; // Correct the path

const store = createStore(rootReducer);

export default store;


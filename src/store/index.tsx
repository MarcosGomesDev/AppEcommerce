import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules/rootReducer';

export const store = createStore(rootReducer);

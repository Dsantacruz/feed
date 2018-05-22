import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/*const store = createStore(rootReducer);

export default store;*/

export default (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(
      thunk
    )(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
  
    return store;
  };
  
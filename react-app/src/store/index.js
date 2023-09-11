import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { pinsReducer } from './pinsReducer';
import { boardsReducer } from './boardsReducer';
import { commentsReducer } from './commentsReducer';
import { topicsReducer } from './topicsReducer'


const rootReducer = combineReducers({
  session,
  pinsReducer,
  boardsReducer,
  commentsReducer,
  topicsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

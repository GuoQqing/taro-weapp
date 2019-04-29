import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '../redux-saga/dist/redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  a,
]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(require('redux-logger').createLogger());
// }

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
}

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers';
import monitorReducersEnhancer from './enhancers/monitor_reducers';



export default function (preloadedState)
{
  const middlewares = [ thunkMiddleware ];
  const enhancers = [ monitorReducersEnhancer ];

  let composedEnhancers = null;
  
  if(process.env.NODE_ENV === "development")
  {
    //adding logger at start because need to log 
    // action before any other middleware;

    middlewares.push( logger );
    
    // only want to access to redux devtools if its in development mode
    composedEnhancers = composeWithDevTools( applyMiddleware(...middlewares) , ...enhancers);
  }
  else
  {
    // in production mode  dont want to use redux dev tools do using compose
    composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);
  }
  

  return createStore(
        combineReducers(rootReducer),
        preloadedState,
        composedEnhancers
    );
}

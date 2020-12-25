import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { AppModel, models } from "./index";
import { reducer as formReducer } from 'redux-form';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import createLoadingPlugin from '@rematch/loading';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()
const options = {};
const loading = createLoadingPlugin(options);
export const store = init({
   redux: {
      reducers:{
          router: connectRouter(history),
          form:formReducer
      },
      middlewares: [
          routerMiddleware(history)
      ],
      rootReducers: {
          RESET_APP: (state,payload) => undefined
      },
      devtoolOptions: {
          disabled: process.env.NODE_ENV === 'production',
      }
  },
   models: models,
   plugins: [
      loading
  ]
})

export type Store = typeof store
export type Dispatch = RematchDispatch<AppModel>
export type AppState = RematchRootState<AppModel>
export const { dispatch } = store

import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { checkUserAuth, fetchQuests} from './action';
import history from '../history';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api,
        history
      }
    },
  }),
});

store.dispatch(checkUserAuth());
store.dispatch(fetchQuests());

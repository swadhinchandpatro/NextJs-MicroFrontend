import { starWarApi } from "../../services/apis/StarWars";
import counterReducer from "../../services/view/counter";

// ! These both are temporary till we find a better solution

/*
  * federated Middleware - are the middlewares which are going to be consumed by remote 
  * to execute RTK-Query features like caching , prefetching etc.
*/
export const federatedMiddleware = [
    starWarApi.middleware
];

/*
  * federated Reducers - are the reducers which are going to be consumed by remote 
  * to persist in store remote side. 
*/
export const federatedReducers = {
  [starWarApi.reducerPath]: starWarApi.reducer,
  hostCounter: counterReducer,
};

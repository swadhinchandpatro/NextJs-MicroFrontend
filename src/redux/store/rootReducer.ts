import counterReducer from "../../services/view/counter";
import { starWarApi } from "../../services/apis/StarWars";

export const rootReducer = {
  counter: counterReducer,
  [starWarApi.reducerPath]: starWarApi.reducer,
};

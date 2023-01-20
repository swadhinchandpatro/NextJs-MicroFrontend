import { useCounter } from "../redux/slices/view/counterSlice";
import { useGetStarWarFilmsList } from "../redux/slices/StarWars";

/*
  * This is used by serviceResolver to resolve services for view components
*/

export const rootServiceProvider = {
  starWarFilmList: useGetStarWarFilmsList,
  counter: useCounter,
};

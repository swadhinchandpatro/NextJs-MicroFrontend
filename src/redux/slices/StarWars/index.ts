import { useGetStarWarMoviesListQuery } from "../../../services/apis/StarWars";
import { queryFnArgs } from "../../../services/apis/types";
import { StarWarFilmList } from "../../../services/interfaces/StarWars";
import { UseQueryResult } from "../../../utility/rtkQuery/useQuery";

// * Custom Service Methods for StarWars , which will be exposed to developer not the slices
const useGetStarWarFilmsList = (
  queryFnArg: queryFnArgs,
  option?: object
): UseQueryResult<StarWarFilmList> =>
  useGetStarWarMoviesListQuery(queryFnArg, option);

export { useGetStarWarFilmsList };

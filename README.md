# nextJs-microfrontend

- [Sentry](#Sentry) 
- [Folder Structure For Redux](#Folder-Structure-For-Redux)
- [Redux and RTK Query Integration](#Redux-and-RTK-Query-Integration) 
### Sentry
-- Add .env file
-- Run commands 
    npm install    or    npm i
    npm run build

# If there is any build failure with error 
    16:28:52.555 | error: API request failed
    16:28:52.555 | caused by: sentry reported an error: Authentication credentials were not provided. (http status: 401)
-- Check SENTRY_AUTH_TOKEN in .env

If that issue is still not resolved then
-- in next.config.js add to generate build on local
module.exports = withSentryConfig(moduleExports, {
  dryRun: process.env.VERCEL_ENV !== "production"
});

### Folder Structure For Redux

```sh
.src
├── components 
├── redux
    ├── slices
        ├── StarWars(Custom Wrapper which will be exposed)
    ├── store  
    ├── view 
        ├── state & reducers wrapper(Non API Call)
├── services   
    ├── apis
        ├── StarWars(Custom endpoints or defiitions which will be exposed to custom service)
    ├── interfaces(Typescript interfaces)
        ├── StarWars(Interface)
        ├── view state & reducers Interface(Non API Call)     
    ├── view 
        ├── action & reducers endpoints or defiitions(Non API Call)            
├── utility                  
```
### Redux and RTK Query Integration

Following process needs to be done :-

- Create a endpoint definitions or methods related to use case as per RTK Query(Slices).

```sh
export const starWarApi = createApi({
  reducerPath: "starWars",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getStarWarMoviesList: builder.query({
      query: ({ params, config }) =>
        fetcher({
          url: "films",
          method: "GET",
          params: params,
          config: config,
        }),
    }),
    addStarWarFilm : builder.mutation({
      query: ({ params, config }) =>
        fetcher({
          url: "films",
          method: "POST",
          params: params,
          config: config,
        }),
    }),
  }),
});
```
The above is one of the example on how you can create a slice . 

- Now , make a custom wrapper which we are going to expose to the view component.

```sh
const useGetStarWarFilmsList = (
  queryFnArg: queryFnArgs,
  option?: object
): UseQueryResult<StarWarFilmList> =>
  useGetStarWarMoviesListQuery(queryFnArg, option);
```

- Add your hooks provided by RTK Query For that particular endpoint in rootServiceProvider , to be mapped with unique key ( same should be define in constants) which will be resolved by service resolver.

```sh 
export const rootServiceProvider = {
  starWarFilmList: useGetStarWarFilmsList,
  counter: useCounter,
};
```

- Map Key Name in Constants , which will be used by view component similar to the key name in rootServiceProvider.

```sh
export const GET_FILMS_LIST_SERVICE = "starWarFilmList";
export const GET_COUNTER = "counter";
```

- Call APi from any component as per use case.

```sh
const { data , } = useService(GET_FILMS_LIST_SERVICE);
```

Similarly , we can expose for view Reducers . Pls , see counter example.

# How to expose API to Consumer Project ??

- Add api reducers and middlewares to federatedMiddlewareReducers which are going to be exposed 
```sh
export const federatedMiddleware = [
    starWarApi.middleware
];

export const federatedReducers = {
  [starWarApi.reducerPath]: starWarApi.reducer,
  hostCounter: counterReducer,
};

```

Rest , will be handled in consumer .

For More Queries contact @VipulPathak

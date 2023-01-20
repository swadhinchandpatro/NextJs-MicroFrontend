import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { starWarApi } from "../../services/apis/StarWars";
import { configStore } from "../../utility/reduxStatePersist/configStore";
import { loadState } from "../../utility/reduxStatePersist/loadState";
import { rootReducer } from "./rootReducer";

const persistedState = loadState(configStore.key, configStore.encryption);

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

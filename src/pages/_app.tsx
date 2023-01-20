import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundaries";
import StatePersist from "../utility/reduxStatePersist/statePersist";
import { store, wrapper } from "../redux/store";

function App({ Component, pageProps }: AppProps) {
  return (
    // State Persist Custom HOC Library which saves states to local storage
    <StatePersist store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </StatePersist>
  );
}

export default wrapper.withRedux(App);

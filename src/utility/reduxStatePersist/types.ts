import { ReactNode } from "react";

export interface ConfigStore {
  key: string;
  stateConfiguration?: StateConfiguration[];
  encryption?: boolean;
}

export interface StateConfiguration {
  stateName: string;
  key?: {
    keyName: string;
    tte?: string;
    blacklist?: boolean;
    whitelist?: boolean;
  }[];
  tte?: string;
  blacklist?: boolean;
  whitelist?: boolean;
}

export interface Props {
  children?: ReactNode;
}

export interface State {
  [key: string]: any;
}

export interface AppProps {
  store: any;
  children?: React.ReactNode;
}

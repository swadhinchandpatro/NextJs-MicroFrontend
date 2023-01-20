import type { ConfigStore } from "./types";

// State Persist Configuration used by the application.

/* 
   * * key : is the name of the key in local storage under which states are going to be persisted
   * * stateConfiguration : defines all configutaion for list of arrays to be persisted. Its optional.
   * * encryption : defines whether or not to encrypt the state data. Its optional.
   * 
   * stateConfiguration - It contains list of objects for states and their configuration properties.
   * 
   * * stateName - Name of the state
   * * key - Its optional , and its of states which are object type and all state properties are applicable to keys also.
   * * tte - Its optional and its time to expire of the state and its in miliseconds.
   * * blacklist - Its optional and its those states which are to be blacklisted i.e. not to persist in the local storage.
   * * whitelist - Its optional and its those states which are to be whitelisted i.e. only these states are going to persist in the local storage.
*/
export const configStore: ConfigStore = {
  key: "host",
  stateConfiguration: [
    {
      stateName: "counter",
      key: [
        {
          keyName: "value",
        },
      ],
    },
  ],
  encryption: false,
};

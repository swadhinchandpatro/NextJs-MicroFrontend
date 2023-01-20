import { decryptData, encryptData } from "./EncryptStorage";
import type { State } from "./types";

export const loadState = (storageKey: string, encryption = false) => {
  try {
    const serializedState = localStorage.getItem(storageKey);

    if (serializedState === null) {
      return undefined;
    }
    if (encryption)
      return loadStateData(JSON.parse(decryptData(serializedState)));
    else return loadStateData(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

const loadStateData = (serializedState: State) => {
  if (Object.keys(serializedState).length > 0) {
    Object.keys(serializedState).forEach((key) => {
      let state = serializedState[key];
      let timeToExpireForState = state._expiryTime;
      if (timeToExpireForState) {
        if (isExpired(timeToExpireForState)) {
          delete serializedState[key];
          return;
        } else {
          serializedState[key] = state._value;
        }
      }

      if (Object.keys(state).length > 0) {
        Object.keys(state).forEach((keyObj) => {
          let timeToExpireForKey = state[keyObj]._expiryTime;
          if (timeToExpireForKey) {
            if (isExpired(timeToExpireForKey))
              delete serializedState[key][keyObj];
            else serializedState[key][keyObj] = state[keyObj]._value;
          }
        });
      }

      if (Object.keys(state).length === 0) {
        delete serializedState[key];
        return;
      }
    });
  }

  return serializedState;
};

const isExpired = (_expiryTime: string) => {
  const now = new Date();
  return now.getTime() > Number(_expiryTime);
};

export const saveState = (
  storageKey: string,
  persistedState: State,
  encryption = false
) => {
  try {
    const serializedState = JSON.stringify(persistedState);
    if (encryption)
      localStorage.setItem(storageKey, encryptData(serializedState));
    else localStorage.setItem(storageKey, serializedState);
  } catch (err) {
    // Ignore write errors.
    console.error("Something Went Wrong !!!");
  }
};

export const flushState = (storageKey: string) => {
  try {
    localStorage.removeItem(storageKey);
  } catch (err) {
    console.error("Something Went Wrong !!!");
  }
};

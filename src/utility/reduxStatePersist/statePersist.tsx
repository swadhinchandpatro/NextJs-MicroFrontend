import { omit, pick, throttle } from "lodash-es";
import { configStore } from "./configStore";
import { saveState } from "./loadState";
import type { AppProps, State } from "./types";

export default function StatePersist(props: AppProps) {
  const storageKey = configStore.key;
  const stateConfiguration = configStore.stateConfiguration || null;

  const whiteListGeneration = () => {
    let whiteListStates: string[] = [];
    if (stateConfiguration && stateConfiguration.length > 0) {
      stateConfiguration.forEach((item) => {
        if (item.whitelist) {
          whiteListStates.push(item.stateName);
        }
      });
    }

    return whiteListStates;
  };

  props.store.subscribe(
    throttle(() => {
      const stateList = props.store.getState();

      //Deep Copying works not shallow copying
      const localStateList = JSON.parse(JSON.stringify(stateList));
      const whiteListStates = whiteListGeneration();
      if (stateList && Object.keys(stateList).length > 0) {
        let persistedState: State = {};
        Object.keys(stateList).forEach((state) => {
          if (
            whiteListStates &&
            whiteListStates.length > 0 &&
            !whiteListStates.includes(state)
          )
            return;
          const stateFormationObj = stateFormation(state, localStateList);
          if (typeof stateFormationObj === "boolean") {
            return;
          } else {
            persistedState[state] = stateFormationObj;
          }
        });
        saveState(storageKey, persistedState, configStore.encryption);
      }
    })
  );

  const stateFormation = (state: string, localStateList: State): State => {
    if (stateConfiguration && stateConfiguration.length > 0) {
      stateConfiguration.forEach((item) => {
        if (state === item.stateName) {
          if (item.blacklist) {
            localStateList[state] = {};
            return;
          }

          if (item.hasOwnProperty("key") && item?.key && item.key?.length > 0) {
            let blackListKeys: string[] = [];
            let whiteListKeys: string[] = [];
            item?.key?.forEach((key) => {
              if (localStateList[state][key.keyName] !== undefined) {
                if (key.blacklist) {
                  blackListKeys.push(key.keyName);
                }

                if (key.whitelist) {
                  whiteListKeys.push(key.keyName);
                }

                if (key?.tte && key?.tte?.trim().length > 0) {
                  let keyValue = localStateList[state][key.keyName];
                  if (typeof keyValue !== "object") {
                    localStateList[state][key.keyName] = {
                      _value: keyValue,
                      _expiryTime: new Date().getTime() + Number(key.tte),
                    };
                  }
                }
              }
            });

            let blackListObj = omit(localStateList[state], blackListKeys);
            if (Object.keys(blackListObj).length > 0) {
              localStateList[state] = blackListObj;
            }

            let whiteListObj = pick(localStateList[state], whiteListKeys);
            if (Object.keys(whiteListObj).length > 0) {
              localStateList[state] = whiteListObj;
            }
          }

          if (item.tte && item.tte.trim().length > 0) {
            if (typeof localStateList[state] !== "object") {
              localStateList[state] = {
                _value: localStateList[state],
                _expiryTime: new Date().getTime() + Number(item.tte),
              };
            }
          }
        }
      });
    }

    return localStateList[state];
  };

  return <>{props.children}</>;
}

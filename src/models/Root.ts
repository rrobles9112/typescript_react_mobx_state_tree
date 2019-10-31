import { useContext, createContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";

const CounterModel = types
  .model({
    count: types.number
  })
  .actions(self => ({
    increment() {
      self.count++;
    },
    decrement() {
      self.count--;
    }
  }));

const RootModel = types.model({
  counter: CounterModel
});

export const rootStore = RootModel.create({
  counter: {
    count: 0
  }
});
onSnapshot(rootStore, snapshot => console.log("Snapshot: ", snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as RootInstance;
}
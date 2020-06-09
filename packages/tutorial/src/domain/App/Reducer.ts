import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { LocalStorage } from "@app/infra";
import * as Constants from "./Constants";

const repository = LocalStorage.createRepository("Counter");

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_COUNT": {
      repository.saveItem<number>(Constants.STORE_COUNT_KEY, action.value);
      return { ...state, value: action.value };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (state: Partial<State>): Reducer => {
  return [reducer, { ...DEFAULT_STATE, ...state }];
};
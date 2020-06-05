import * as Domain from "@app/domain";
import { Page } from "@app/component";
import * as React from "react";
import { generateStore, Store } from "./Store";

const generateProps = (stores: Domain.Stores, store: Store): Page.Props => {
  return {};
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }): React.ReactElement => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const viewStore = generateStore(domainStores);
  return <Page.Component {...generateProps(domainStores, viewStore)} />;
};

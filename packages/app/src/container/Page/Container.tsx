/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as Domain from "@app/domain";
import { Page } from "@app/component";
import * as React from "react";
import { generateStore, Store } from "./Store";

const generateProps = (stores: Domain.Stores, store: Store): Page.Props => {
  const steps = [
    {
      title: "chapter 1",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/1.jpg",
      description: "chapter 1 description",
    },
    {
      title: "chapter 2",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/2.jpg",
      description: "chapter 2 description",
    },
    {
      title: "chapter 3",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/3.jpg",
      description: "chapter 3 description",
    },
    {
      title: "chapter 4",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/4.jpg",
      description: "chapter 4 description",
    },
    {
      title: "chapter 5",
      thumbnailSrc: "https://www.gstatic.com/webp/gallery/5.jpg",
      description: "chapter 5 description",
    },
  ];
  return {
    shareText: {
      onChange: (target) => {
        if (target.currentTarget) {
          store.updateText(target.currentTarget.value);
          store.textChangeCallback(target.currentTarget.value);
        }
      },
    },
    tutorial1: {
      navigation: {
        propText: store.navigationText,
        stateText: store.navigationText,
        textChangeCallback: (callback) => {
          // @ts-ignore
          store.textChangeCallback = callback;
        },
        steps,
      },
    },
    tutorial2: {
      navigation: {
        propText: store.navigationText,
        stateText: store.navigationText,
        textChangeCallback: (callback) => undefined,
        steps,
      },
    },
    tutorial3: {
      navigation: {
        propText: store.navigationText,
        stateText: store.navigationText,
        textChangeCallback: (callback) => undefined,
        steps,
      },
    },
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }): React.ReactElement => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const viewStore = generateStore(domainStores);
  return <Page.Component {...generateProps(domainStores, viewStore)} />;
};

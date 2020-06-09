import * as React from "react";

export interface UpdateCountAction {
  type: "UPDATE_COUNT";
  value: number;
}

export interface UpdateShareText {
  type: "UPDATE_SHARE_TEXT";
  value: string;
}

export type ActionTypes = UpdateCountAction | UpdateShareText;

export type Dispatch = React.Dispatch<ActionTypes>;

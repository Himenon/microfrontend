export interface State {
  onClick: (() => Promise<void> | void) | undefined;
  areaTitle: string;
  value: number;
}

export const DEFAULT_STATE: State = {
  areaTitle: "default title",
  value: 0,
  onClick: undefined,
};

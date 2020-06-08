import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Stores) => {
  return {
    title: stores.app.state.areaTitle,
  };
};

export type Store = ReturnType<typeof generateStore>;

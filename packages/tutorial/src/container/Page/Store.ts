import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Stores) => {
  return {};
};

export type Store = ReturnType<typeof generateStore>;

import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Stores) => {
  return {
    navigationText: stores.app.state.shareText,
    updateText: (text: string) => {
      stores.app.dispatch({
        type: "UPDATE_SHARE_TEXT",
        value: text,
      });
    },
    textChangeCallback: (newText: string) => undefined,
  };
};

export type Store = ReturnType<typeof generateStore>;

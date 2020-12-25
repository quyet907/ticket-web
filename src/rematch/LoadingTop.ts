import { createModel } from "@rematch/core";


export const loadingTop = createModel<boolean>({
  state: false,
  reducers: {
    update(state: any, data: boolean = false) {
      return data
      // return state;
    },
  },
  effects: (dispatch: any) => ({
    showLoad() {
      const loading: boolean = true;
      this.update(loading);
    },
    hiddenLoad() {
      const loading: boolean = false;
      this.update(loading);
    }

  }),
});

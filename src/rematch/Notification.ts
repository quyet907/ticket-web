import { createModel } from "@rematch/core";
import { VariantType } from "notistack";

export type NotificationModel = {
  message?: string;
  variant?: VariantType;
  latestAt?: Date;
};

export type NotificationDispatch = {
  pushMessage(payload: { message: string; variant: VariantType }): void;
};

const initState: NotificationModel = {};

export const notification = createModel<NotificationModel>({
  state: initState,
  reducers: {
    update(state: NotificationModel, data: any = {}) {
      state = {
        ...state,
        ...data,
      };
      return state;
    },
  },
  effects: (dispatch: any) => ({
    pushMessage(payload: { message: string},state: any) {
      const updatedState: NotificationModel = {
        ...state.notification,
        message: payload.message,
        variant: "success",
        latestAt: new Date(),
      };
      dispatch.notification.update(updatedState);
    },
  }),
});

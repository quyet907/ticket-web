import { createModel } from "@rematch/core";
import { VariantType } from "notistack";


export type NotificationModel = {
	message?: string;
	variant?: VariantType;
	latestAt?: Date;
};

// export type NotificationDispatch = {
// 	pushMessage(payload: { message: string; variant: VariantType }): void;
// };

export enum VariantTypeEnum {
	default = "default",
	success = "success",
	error = "error",
	warning = "warning",
	info = "info",
}


const initState: NotificationModel = {
  latestAt : new Date(),
  message : "",
  variant : "success"
};

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
		error(message: string, state: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: message,
				variant: VariantTypeEnum.error,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},

		success(message: string, state: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: message,
				variant: VariantTypeEnum.success,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},

		info(message: string, state: any) {
			const updatedState: NotificationModel = {
				...state.notification,
				message: VariantTypeEnum.info,
				variant: message,
				latestAt: new Date(),
			};
			dispatch.notification.update(updatedState);
		},
	}),
});

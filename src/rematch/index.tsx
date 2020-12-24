import { useDispatch } from "react-redux";
import { authenticationModel } from "./Authentication";
import { notification } from "./Notification";
export interface AppModel {
   authentication: typeof authenticationModel,
   notification: typeof notification
}

export const appModel: AppModel = {
   authentication: authenticationModel,
   notification: notification
}

export const useRematchDispatch = <D extends {}, MD>(
   selector: (dispatch: D) => MD
) => {
   const dispatch = useDispatch<D>();
   return selector(dispatch);
};

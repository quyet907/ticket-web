import { useDispatch } from "react-redux";
import { authenticationModel } from "./Authentication";
export interface AppModel {
   authentication: typeof authenticationModel
}

export const apModel: AppModel = {
   authentication: authenticationModel
}

export const useRematchDispatch = <D extends {}, MD>(
   selector: (dispatch: D) => MD
) => {
   const dispatch = useDispatch<D>();
   return selector(dispatch);
};

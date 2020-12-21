import { useDispatch } from "react-redux";
import { authenModel } from "./Authen";
export interface AppModel {
   authen: typeof authenModel
}

export const model: AppModel = {
   authen : authenModel
}

export const useRematchDispatch = <D extends {}, MD>(
   selector: (dispatch: D) => MD
) => {
   const dispatch = useDispatch<D>();
   return selector(dispatch);
};

import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { AppModel, appModel } from ".";

export const store = init({
   models: appModel
})

export type Store = typeof store
export type Dispatch = RematchDispatch<AppModel>
export type AppState = RematchRootState<AppModel>
export const { dispatch } = store

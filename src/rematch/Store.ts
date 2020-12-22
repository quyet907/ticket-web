import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { AppModel, apModel } from ".";

export const store = init({
   models: apModel
})

export type Store = typeof store
export type Dispatch = RematchDispatch<AppModel>
export type AppState = RematchRootState<AppModel>

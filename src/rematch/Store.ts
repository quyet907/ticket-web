import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { type } from "os";
import { AppModel, model } from ".";

export const store = init({
   redux : {},
   models: model
})

export type Store = typeof store
export type Dispatch = RematchDispatch<AppModel>
export type AppState = RematchRootState<AppModel>

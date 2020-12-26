import { createModel } from "@rematch/core";
import { appClient } from "../service";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";


export type Authentication = {
   auth : Staff,
   token : string
   isAuthen : boolean
} 
const initAuthentication: Authentication = {
   auth : {},
   token : "",
   isAuthen : true
}

export const authenticationModel = createModel<Authentication>({
   state: initAuthentication,
   reducers: {
      update(state: Authentication, data : any = {}) {
         state = {
            ...state,
            auth : data.auth,
            token : data.token,
            isAuthen : data.isAuthen
         }
         return state
      }
   },

   effects: (dispatch: any) => ({
      login(payload: Authentication, state : any) {
         console.log(payload)
         if(payload.auth && payload.token){
            const updateState: Authentication = {
               auth : payload.auth,
               token : payload.token,
               isAuthen : true
            }
            dispatch.authentication.update(updateState)
            appClient.defaults.headers["Authorization"] = updateState.token;
            localStorage.setItem('token', updateState.token);
         }
      },
      logout() {
         localStorage.setItem('token', '')
         dispatch.authentication.update({
            auth : null,
            token : null,
            isAuthen : false
         })
         appClient.defaults.headers["Authorization"] = null;
      }
   }),
});
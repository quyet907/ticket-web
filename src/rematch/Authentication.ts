import { createModel } from "@rematch/core";
import { appClient } from "../service";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";

const initToken: string = ''

export const authenticationModel = createModel<Staff>({
   state: initToken,
   reducers: {
      fetchData(state, token) {
         state = token
         return state
      }
   },

   effects: (dispatch: any) => ({
      login() {
         dispatch.authentication.fetchData(localStorage.getItem('token'))
         appClient.defaults.headers["Authorization"] = localStorage.getItem('token');
      },
      logout() {
         localStorage.setItem('token', '')
         dispatch.authentication.fetchData(localStorage.getItem('token'))
         appClient.defaults.headers["Authorization"] = localStorage.getItem('token');
      }
   }),
});
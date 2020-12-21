import { createModel } from "@rematch/core";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";

const initStaff: Staff = {}

export const authenModel = createModel<Staff>({
   state: initStaff,
   reducers: {
      fetchData(state, data) {
         console.log(state);
         state = {
            ...state, ...data
         }
         console.log(state)
         return state
      }
   },

   effects: (dispatch: any) => ({
      login(data : {account :Staff, token : string}) {
         console.log(data)
         if(data.token) localStorage.setItem("token", data.token);
         this.fetchData(data.account)
      },
      logout() {
         localStorage.setItem("token", '');
      }
   }),
});
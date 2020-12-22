import { AxiosInstance } from "axios";
import { BaseController } from "../BaseController";

export class AccountController extends BaseController<Account>  {

   public constructor(
      serviceURL: string,
      basePath: string,
      client: AxiosInstance
   ) {
      super(serviceURL, basePath, client);
   }


   login(username: string, password: string) {
      return this.client.get(`${this.serviceURL}/${this.basePath}/login`, { params: { username, password } }).then(res => {
         return res.data
      }).catch(err => {
         console.log(err)
      })
   }

   getMe() {
      return this.client.get(`${this.serviceURL}/${this.basePath}/getMe`).then(res => {
         return res.data
      })
   }
}
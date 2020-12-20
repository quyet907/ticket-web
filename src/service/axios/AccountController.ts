import Axios, { AxiosInstance } from "axios";
import appConfig from "../../configs/AppConfig";
import { serviceName } from "../../submodules/base-ticket-team/query/NameService";
import { BaseController } from "../BaseController";
import { IAccountService } from "../IAccountService";

export class AccountController extends BaseController<Account>  {

   public constructor(
      serviceURL: string,
      basePath: string,
      client: AxiosInstance
   ) {
      super(serviceURL, basePath, client);
   }


   login(username: string, password: string) {
      return Axios.get(`${appConfig.applicationUrl}/${serviceName.account}/login`, { params: { username, password } }).then(res => {
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
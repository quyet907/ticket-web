import { AxiosInstance } from "axios";
import { Customer } from "../submodules/base-ticket-team/base-carOwner/Customer";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { BaseController } from "./BaseController";

export class CustomerService extends BaseController<Customer> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
  async list(l : IList): Promise<Paging<Customer>>{
    l = {...l,searchFields: ["CMND", "description", "email" , "name", "phoneNumber", "sex"]}
    return super.list(l);
  }
}

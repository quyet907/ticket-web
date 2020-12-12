import { AxiosInstance } from "axios";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { BaseController } from "./BaseController";

export class StaffService extends BaseController<Staff> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }

  async list(l : IList): Promise<Paging<Staff>>{
    l = {...l,searchFields: ["address", "identityCard", "sex" , "phoneNumber", "name"]}
    return super.list(l);
  }
}

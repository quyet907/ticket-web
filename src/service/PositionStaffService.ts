import { AxiosInstance } from "axios";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";

import { BaseController } from "./BaseController";

export class PositionStaffService extends BaseController<PositionStaff> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
  
  
  async list(l : IList): Promise<Paging<PositionStaff>>{
    l = {...l,searchFields: ["name", "description"]}
    return super.list(l);
  }

}

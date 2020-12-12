import { AxiosInstance } from "axios";
import { Car } from "../submodules/base-ticket-team/base-carOwner/Car";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { BaseController } from "./BaseController";

export class CarService extends BaseController<Car> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }

  async list(l : IList): Promise<Paging<Car>>{
    l = {...l,searchFields: ["description", "name", "origin" , "licensePlates"]}
    return super.list(l);
  }
}

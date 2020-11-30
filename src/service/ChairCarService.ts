import { AxiosInstance } from "axios";
import { ChairCar } from "../base-ticket-team/base-ticket-team/base-carOwner/ChairCar";
import { BaseController } from "./BaseController";

export class ChairCarService extends BaseController<ChairCar> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

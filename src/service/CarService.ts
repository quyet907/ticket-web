import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { BaseController } from "./BaseController";

export class CarService extends BaseController<Car> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

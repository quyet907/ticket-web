import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { Controller } from "./Controller";

export class CarService extends Controller<Car> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

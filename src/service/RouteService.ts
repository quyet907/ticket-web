import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Route } from "../base-ticket-team/base-carOwner/Route";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { BaseController } from "./BaseController";

export class RouteService extends BaseController<Route> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

import { AxiosInstance } from "axios";
import { Route } from "../base-ticket-team/base-ticket-team/base-carOwner/Route";
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

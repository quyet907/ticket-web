import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { Trip } from "../base-ticket-team/base-carOwner/Trip";
import { BaseController } from "./BaseController";

export class TripService extends BaseController<Trip> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

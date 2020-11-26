import { AxiosInstance } from "axios";
import { PositionStaff } from "../base-ticket-team/base-carOwner/PositionStaff";
import { Controller } from "./Controller";

export class PositionStaffService extends Controller<PositionStaff> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

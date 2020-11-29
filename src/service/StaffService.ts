import { AxiosInstance } from "axios";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { BaseController } from "./BaseController";

export class StaffService extends BaseController<Staff> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

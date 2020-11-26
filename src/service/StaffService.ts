import { AxiosInstance } from "axios";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { Controller } from "./Controller";

export class StaffService extends Controller<Staff> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

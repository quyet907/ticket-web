import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Customer } from "../base-ticket-team/base-carOwner/Customer";
import { BaseController } from "./BaseController";

export class CustomerService extends BaseController<Customer> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

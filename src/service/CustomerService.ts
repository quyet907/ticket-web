import { AxiosInstance } from "axios";
import { Customer } from "../submodules/base-ticket-team/base-carOwner/Customer";
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

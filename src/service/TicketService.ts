import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { Ticket } from "../base-ticket-team/base-carOwner/Ticket";
import { BaseController } from "./BaseController";

export class TicketService extends BaseController<Ticket> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }
}

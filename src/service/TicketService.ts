import { AxiosInstance } from "axios";
import { Ticket } from "../base-ticket-team/base-ticket-team/base-carOwner/Ticket";
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

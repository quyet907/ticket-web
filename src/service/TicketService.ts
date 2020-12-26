import { AxiosInstance } from "axios";
import { dispatch } from "../rematch/store";
import { Ticket } from "../submodules/base-ticket-team/base-carOwner/Ticket";
import { CreateTicket } from "../submodules/base-ticket-team/controller.ts/CreateTicket";
import { BaseController } from "./BaseController";

export class TicketService extends BaseController<Ticket> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }

  public changeChair(params: Ticket[]): Promise<Ticket[]> {
    return this.client
      .post(`${this.serviceURL}/${this.basePath}/changeChair`, {data : params})
      .then((res) => {
        dispatch.notification.success("Lưu vé thành công ");
        return res.data;
      });
  }

  public createMany(params: Ticket[]): Promise<Ticket[]> {
    return this.client
      .post(`${this.serviceURL}/${this.basePath}/createMany`, {data : params})
      .then((res) => {
        dispatch.notification.success("Lưu vé thành công ");
        return res.data;
      });
  }
  
}

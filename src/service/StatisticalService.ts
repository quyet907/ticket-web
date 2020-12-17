import { AxiosInstance } from "axios";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";
import { Summary } from "../submodules/base-ticket-team/controller.ts/Statistical";
import { Statistical } from "../submodules/base-ticket-team/Statistical/Statistical";
import { BaseController } from "./BaseController";

export class StatisticalService {
  serviceURL: string;
  basePath: string;
  client: AxiosInstance;

  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    this.basePath = basePath;
    this.client = client;
    this.serviceURL = serviceURL;
  }

  public StatisticalSummaryService(): Promise<Summary>{
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/Statistical`)
      .then((res) => {
        return res.data;
      });
  }
  public StatisticalIntervalTicketService(params:{type : "month"| "day"}): Promise<Summary>{
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/IntervalTicket`, {params: params})
      .then((res) => {
        return res.data;
      });
  }
  public StatisticalIntervalRevenueTicketService(params:{type : "month"| "day"}): Promise<Summary>{
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/IntervalRevenue`, {params: params})
      .then((res) => {
        return res.data;
      });
  }
}

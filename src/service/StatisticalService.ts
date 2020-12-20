import { AxiosInstance } from "axios";
import { Summary, IntervalTicketChart } from "../submodules/base-ticket-team/controller.ts/Statistical";
import { IStatisticalController } from "./IStatisticalController";


export class StatisticalService implements IStatisticalController{
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
  statisticalSummary(): Promise<Summary> {
    throw new Error("Method not implemented.");
  }
  statisticalIntervalTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
    throw new Error("Method not implemented.");
  }
  statisticalIntervalRevenueTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
    throw new Error("Method not implemented.");
  }
}

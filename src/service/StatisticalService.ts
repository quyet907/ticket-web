import { AxiosInstance } from "axios";
import { Summary, IntervalTicketChart } from "../submodules/base-ticket-team/controller.ts/Statistical";
import { IStatisticalController } from "./IStatisticalController";


export class StatisticalService implements IStatisticalController {
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
    return this.client.get(`${this.serviceURL}/${this.basePath}/StatisticalSummary`).then(res => {
      console.log(res.data)
      return res.data
    }).
      catch(err => null)
  }
  statisticalIntervalTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/StatisticalSummary`, { params }).then(res => {
      console.log(res.data)
      return res.data
    }).
      catch(err => null)
  }
  statisticalIntervalRevenueTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/StatisticalSummary`, { params }).then(res => {
      console.log(res.data)
      return res.data
    }).
      catch(err => null)
  }
}

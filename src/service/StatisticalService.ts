import { AxiosInstance } from "axios";
import { Summary, IntervalTicketChart, PropsSummary } from "../submodules/base-ticket-team/controller.ts/Statistical";
import { IStatisticalController } from "./IStatisticalController";


export class StatisticalService implements IStatisticalController {
  serviceURL: string;
  basePath: string;
  client: AxiosInstance;

  public constructor(serviceURL: string, basePath: string, client: AxiosInstance) {
    this.basePath = basePath;
    this.client = client;
    this.serviceURL = serviceURL;
  }
  statisticalSummary(params: PropsSummary): Promise<Summary> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/StatisticalSummary`, { params }).then(res => {
      console.log(res.data)
      return res.data
    }).
      catch(err => null)
  }
  statisticalIntervalTicket(params: PropsSummary): Promise<IntervalTicketChart[]> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/IntervalTicket`, { params }).then(res => {
      return res.data
    }).catch(err => null)
  }
  statisticalIntervalRevenueTicket(params: PropsSummary): Promise<IntervalTicketChart[]> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/IntervalRevenue`, { params }).then(res => {
      return res.data
    }).catch(err => null)
  }
}


// daafy voa from va to 
// data IntervalTicketChart
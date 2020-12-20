import { Summary, IntervalTicketChart } from "../../submodules/base-ticket-team/controller.ts/Statistical";
import { IStatisticalController } from "../IStatisticalController";
import axios from 'axios'
import appConfig from "../../configs/AppConfig";
import { serviceName } from "../../submodules/base-ticket-team/query/NameService";

export class StatisticController implements IStatisticalController {
   statisticalSummary(): Promise<Summary> {
      return axios.get(`${appConfig.applicationUrl}/${serviceName.statistics}/StatisticalSummary`,
         { headers: { 'Authorization': localStorage.getItem('token') } }).then(res => {

            return res.data
         })
   }
   statisticalIntervalTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
      throw new Error("Method not implemented.");
   }
   statisticalIntervalRevenueTicket(params: { type: "month" | "day"; }): Promise<IntervalTicketChart[]> {
      throw new Error("Method not implemented.");
   }

}
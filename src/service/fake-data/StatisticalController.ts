import {
   Summary,
   IntervalTicketChart,
} from "../../submodules/base-ticket-team/controller.ts/Statistical";
import { IStatisticalController } from "../IStatisticalController";

export class StatisticalController implements IStatisticalController {
   statisticalSummary(): Promise<Summary> {
      return Promise.resolve({
         totalCustomer: 4543,
         totalRevenue: 13453455,
         totalTicket: 4543,
         totalTrip: 121,
      });
   }

   statisticalIntervalTicket(params: { type: "month" | "day" }): Promise<IntervalTicketChart[]> {
      return Promise.resolve([
         {}, {}, {}, {}
      ])

   }
   statisticalIntervalRevenueTicket(params: { type: "month" | "day" }): Promise<IntervalTicketChart[]> {
      throw new Error("Method not implemented.");
   }
}

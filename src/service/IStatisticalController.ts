import { Summary, IntervalTicketChart } from "../submodules/base-ticket-team/controller.ts/Statistical";

export interface IStatisticalController {
   statisticalSummary(): Promise<Summary>;
   statisticalIntervalTicket(params:{type : "month"| "day"}): Promise<IntervalTicketChart[]>;
   statisticalIntervalRevenueTicket(params:{type : "month"| "day"}): Promise<IntervalTicketChart[]>
}

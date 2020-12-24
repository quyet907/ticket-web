import { Summary, IntervalTicketChart, PropsSummary } from "../submodules/base-ticket-team/controller.ts/Statistical";

export interface IStatisticalController {
   statisticalSummary(): Promise<Summary>;
   statisticalIntervalTicket(params: PropsSummary): Promise<IntervalTicketChart[]>;
   statisticalIntervalRevenueTicket(params:{type : "month"| "day"}): Promise<IntervalTicketChart[]>
}

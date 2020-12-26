import { Summary, IntervalTicketChart, PropsSummary } from "../submodules/base-ticket-team/controller.ts/Statistical";

export interface IStatisticalController {
   statisticalSummary(params: PropsSummary): Promise<Summary>;
   statisticalIntervalTicket(params: PropsSummary): Promise<IntervalTicketChart[]>;
   statisticalIntervalRevenueTicket(params: PropsSummary): Promise<IntervalTicketChart[]>
}

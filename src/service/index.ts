import axios from "axios";
import { Route } from "react-router";
import appConfig from "../configs/AppConfig";
import { serviceName } from "../submodules/base-ticket-team/query/NameService";
import { CarService } from "./CarService";
import { ChairCarService } from "./ChairCarService";
import { CustomerService } from "./CustomerService";
import { PositionStaffService } from "./PositionStaffService";
import { RouteService } from "./RouteService";
import { StaffService } from "./StaffService";
import { StatisticalService } from "./StatisticalService";
import { TicketService } from "./TicketService";
import { TripService } from "./TripService";
export const appClient = axios.create({
	baseURL: "",
	timeout: 10000,
	headers: {
		common: {
			"Content-Type": "application/json",
		},
	},
});

appClient.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

appClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
			} else if (error.response.status === 403) {
			} else if (error.response.status && error.response.status >= 500) {
			} else if (
				error.response.status &&
				error.response.status === 400 &&
				error.response.data
			) {
			} else {
			}
		} else {
		}
		return Promise.reject(error);
	}
);

export const URL = appConfig.applicationUrl;

export const staffController = new StaffService(URL, serviceName.staff, appClient);
export const positionStaffController = new PositionStaffService(URL,serviceName.position , appClient);
export const carController = new CarService(URL, serviceName.car, appClient);
export const chairCarController = new ChairCarService(URL, serviceName.chairCar, appClient);
export const customerController = new CustomerService(URL, serviceName.customer, appClient);
export const routeController = new RouteService(URL, serviceName.route, appClient);
export const ticketController = new TicketService(URL, serviceName.ticket, appClient);
export const tripController = new TripService(URL, serviceName.trip, appClient);
export const statistic = new StatisticalService(URL, serviceName.statistics, appClient)
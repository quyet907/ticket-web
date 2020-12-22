import axios from "axios";
import { number } from "joi";
import appConfig from "../configs/AppConfig";
import { serviceName } from "../submodules/base-ticket-team/query/NameService";
import { AccountController } from "./axios/AccountController";
import { CarService } from "./CarService";
import { ChairCarService } from "./ChairCarService";
import { CustomerService } from "./CustomerService";
import { PositionStaffService } from "./PositionStaffService";
import { RouteService } from "./RouteService";
import { StaffService } from "./StaffService";
import { StatisticalService } from "./StatisticalService";
// import { StatisticalService } from "./StatisticalService";
import { TicketService } from "./TicketService";
import { TripService } from "./TripService";

const getTokenFromLocalStorage = () => {
	return localStorage.getItem("token")
}

export const appClient = axios.create({
	baseURL: "",
	timeout: 10000,
	headers: {
		common: {
			"Content-Type": "application/json",
		},
		Authorization: getTokenFromLocalStorage(),
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
		console.log(error)
		if (error.response) {
			if (error.response.status === 401) {
				console.log("da gap loi 401")
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
export const positionStaffController = new PositionStaffService(URL, serviceName.position, appClient);
export const carController = new CarService(URL, serviceName.car, appClient);
export const chairCarController = new ChairCarService(URL, serviceName.chairCar, appClient);
export const customerController = new CustomerService(URL, serviceName.customer, appClient);
export const routeController = new RouteService(URL, serviceName.route, appClient);
export const ticketController = new TicketService(URL, serviceName.ticket, appClient);
export const tripController = new TripService(URL, serviceName.trip, appClient);
export const statisticController = new StatisticalService(URL, serviceName.statistics, appClient)
export const accountController = new AccountController(URL, serviceName.account, appClient)

// lasy ham login, lay Get me
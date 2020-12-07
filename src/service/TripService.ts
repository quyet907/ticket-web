import { AxiosInstance } from "axios";
import { Trip } from "../submodules/base-ticket-team/base-carOwner/Trip";
import { IGetByDate } from "../submodules/base-ticket-team/controller.ts/TripController";
import { BaseController } from "./BaseController";

export class TripService extends BaseController<Trip> {
	public constructor(serviceURL: string, basePath: string, client: AxiosInstance) {
		super(serviceURL, basePath, client);
		
	}
    public getListByDate(params : IGetByDate): Promise<Trip> {
		return this.client
      .get(`${this.serviceURL}/${this.basePath}/getListByDate`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
	}

	public getListByCarId(params : {id: string}): Promise<Trip> {
		return this.client
      .get(`${this.serviceURL}/${this.basePath}/getListByDate`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
	}

	public getChairByTrip(params : {id: string}): Promise<Trip> {
		return this.client
      .get(`${this.serviceURL}/${this.basePath}/getChairByTrip`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
	}

	

}

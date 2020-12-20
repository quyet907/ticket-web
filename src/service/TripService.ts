import { AxiosInstance } from "axios";
import { Trip } from "../submodules/base-ticket-team/base-carOwner/Trip";
import { DiagramChairOfTrip } from "../submodules/base-ticket-team/controller.ts/DiagramChairOfTrip";
import { IGetByDate } from "../submodules/base-ticket-team/controller.ts/TripController";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { BaseController } from "./BaseController";

export class TripService extends BaseController<Trip> {
	public constructor(serviceURL: string, basePath: string, client: AxiosInstance) {
		super(serviceURL, basePath, client);
		
	}
    public getListByDate(params : IGetByDate): Promise<Paging<Trip>> {
    params.from.setDate(1);
    params.to.setDate(30);

		return this.client
      .get(`${this.serviceURL}/${this.basePath}/getListByDate`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

	public getListByCarId( query: IList,id: string): Promise<Paging<Trip>> {
    const newQuery: IList = {
      ...query,
      query : {...query.query, carId : id}

    }
		return super.list(newQuery)
	}

	public getChairByTrip(params : {id: string}): Promise<DiagramChairOfTrip> {
		return this.client
      .get(`${this.serviceURL}/${this.basePath}/getChairByTrip/${params.id}`, {
      })
      .then((res) => {
        return res.data;
      });
	}

	

}

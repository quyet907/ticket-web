import { AxiosInstance } from "axios";
import { Car } from "../base-ticket-team/base-carOwner/Car";
import { ChairCar } from "../base-ticket-team/base-carOwner/ChairCar";
import { Staff } from "../base-ticket-team/base-carOwner/Staff";
import { BaseController } from "./BaseController";

export class ChairCarService extends BaseController<ChairCar> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }

  public async getByCarId(carId: string): Promise<any> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/byCar/${carId}`)
      .then((res) => res)
      .catch((err) => null);
  }

  public async autoCreate(params: any): Promise<any> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/autoCreateChair`, {
        params: params,
      })
      .then((res) => res)
      .catch((res) => null);
  }
}

import { AxiosInstance } from "axios";
import { ChairCar } from "../base-ticket-team/base-carOwner/ChairCar";
import { CreateChairCar } from "../base-ticket-team/controller.ts/CreateChairCar";
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

  public async autoCreate(params: CreateChairCar): Promise<any> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/autoCreateChair`, {
        params: params,
      })
      .then((res) => res.data)
      .catch((res) => null);
  }
}

import { AxiosInstance } from "axios";
import { ChairCar } from "../submodules/base-ticket-team/base-carOwner/ChairCar";
import { CreateChairCar } from "../submodules/base-ticket-team/controller.ts/CreateChairCar";
import { ListChairCar } from "../submodules/base-ticket-team/controller.ts/ListChairCar";
import { BaseController } from "./BaseController";

export class ChairCarService extends BaseController<ChairCar> {
  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    super(serviceURL, basePath, client);
  }

  public async getByCarId(carId: string): Promise<ListChairCar> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/byCar/${carId}`)
      .then((res) => res.data)
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

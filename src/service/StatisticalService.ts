import { AxiosInstance } from "axios";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";
import { Statistical } from "../submodules/base-ticket-team/Statistical/Statistical";
import { BaseController } from "./BaseController";

export class StaffService {
  serviceURL: string;
  basePath: string;
  client: AxiosInstance;

  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    this.basePath = basePath;
    this.client = client;
    this.serviceURL = serviceURL;
  }

  public StatisticalService(params:{type : "month"| "day"}): Promise<Statistical>{
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/Statistical`, {params: params})
      .then((res) => {
        return res.data;
      });
  }
}

import { AxiosInstance } from "axios";
import { ICount } from "../base-ticket-team/query/ICount";
import { IFind } from "../base-ticket-team/query/IFind";
import { IList } from "../base-ticket-team/query/IList";
import { Paging } from "../base-ticket-team/query/Paging";

export class BaseController<T> {
  protected serviceURL: string;
  protected basePath: string;
  protected client: AxiosInstance;

  public constructor(
    serviceURL: string,
    basePath: string,
    client: AxiosInstance
  ) {
    this.serviceURL = serviceURL;
    this.basePath = basePath;
    this.client = client;
  }
  public list(params: IList): Promise<Paging<T>> {
    return this.client.get(`${this.serviceURL}/${this.basePath}`, {
      params: params,
    })
    .then(res=>{
        return res.data
    })
  }

  public find(params: IFind): Promise<T[]> {
    return this.client.get(`${this.serviceURL}/find/${this.basePath}`, {
      params: params,
    })
    .then(res=>{
        return res.data
    })
  }

  public create(params: T): Promise<T> {
    return this.client.post(`${this.serviceURL}/${this.basePath}`, params)
    .then(res=>{
        return res.data
    })
  }

  public getById(params: string): Promise<T> {
    return this.client.get(`${this.serviceURL}/${this.basePath}/${params}`,)
    .then(res=>{
        return res.data
    })
  }

  public delete(id : string) : Promise<T> {
    return this.client.delete(`${this.serviceURL}/${this.basePath}/${id}`,)
    .then(res=>{
        return res.data
    })
  }

  public count(params : ICount): Promise<number>{
    return this.client.get(`${this.serviceURL}/count/${this.basePath}`,)
    .then(res=>{
        return res.data
    })
  }


  



}

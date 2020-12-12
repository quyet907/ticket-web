import { AxiosInstance } from "axios";
import { ICount } from "../submodules/base-ticket-team/query/ICount";
import { IFind } from "../submodules/base-ticket-team/query/IFind";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";



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
    params = { ...params, sort: this.convertSort(params.sort)};
    return this.client
      .get(`${this.serviceURL}/${this.basePath}`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  public find(params?: IFind): Promise<T[]> {
    params = { ...params, sort: this.convertSort(params?.sort) };
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/find`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  public create(params: T): Promise<T> {
    return this.client
      .post(`${this.serviceURL}/${this.basePath}`, params)
      .then((res) => {
        return res.data;
      });
  }

  public getById(params: string): Promise<T> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/${params}`)
      .then((res) => {
        return res.data;
      });
  }

  public delete(id: string): Promise<T> {
    return this.client
      .delete(`${this.serviceURL}/${this.basePath}/${id}`)
      .then((res) => {
        return res.data;
      });
  }

  public count(params: ICount): Promise<number> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/count`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  private convertSort(sort: string[] | string | undefined): string {
    if (!sort) return "";
    if (typeof sort === "string") {
      return sort;
    }
    var sortString: string = "";
    // eslint-disable-next-line array-callback-return
    sort.map((sort) => {
      sortString += `${sort},`;
    });
    sortString = sortString.substring(0,sortString.length -1);
    return sortString;
  }
}

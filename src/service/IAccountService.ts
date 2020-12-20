export interface IAccountService {
  login(username: string, password: string): Promise<string>
  getMe(): Promise<string>
}
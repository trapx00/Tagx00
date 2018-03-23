export enum UserRole {
  Requester = "REQUESTER",
  Worker = "WORKER",
  Admin = "ADMIN"
}


export class User {
  public username: string;
  public role: UserRole;
  public token: string;

  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }

}

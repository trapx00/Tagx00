export enum UserRole {
  Requester = "REQUESTER",
  Worker = "WORKER",
  Admin = "ADMIN"
}


export class User {
  public username: string;
  public role: UserRole;
  public token: string;

  constructor(params) {
    Object.assign(this, params);
    this.role = UserRole[params.role as string];
  }

}

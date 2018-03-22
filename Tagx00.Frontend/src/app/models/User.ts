export enum UserRole {
  Requester = "ROLE_REQUESTER",
  Worker = "ROLE_WORKER",
  Admin = "ROLE_ADMIN"
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

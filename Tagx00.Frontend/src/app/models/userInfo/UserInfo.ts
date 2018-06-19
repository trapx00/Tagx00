import { UserRole } from "../user/User";

export interface UserInfo {
  username: string;
  email: string;
  role: UserRole;
  registerDate: string;
  avatarUrl: string;
}

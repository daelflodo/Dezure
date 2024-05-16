import { ROLES } from "../constants/roles";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: ROLES;
}

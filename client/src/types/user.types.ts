import { RoleUserType } from "./enums/roleUserEnum.types";

export type UserType = {
    id: number;
    name: string;
    password: string;
    email: string;
    imageProfileUrl?: string;
    role: RoleUserType;
    countMessages: number;
    registrationDate: string; // DateTime as ISO string
}

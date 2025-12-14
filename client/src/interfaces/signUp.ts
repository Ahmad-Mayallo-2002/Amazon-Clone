import type { Roles } from "@/enums/roles";

export interface ISignUp {
    token: string;
    id: string;
    role: Roles;
}
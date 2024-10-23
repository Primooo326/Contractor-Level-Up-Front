import { TUserLoginResponse } from "@/models/IUser.model";
import { fetchApiContractor } from "./instances";


export async function login(user: string, password: string): Promise<TUserLoginResponse> {
    return fetchApiContractor.post(`/auth/login`, { user, password });
}
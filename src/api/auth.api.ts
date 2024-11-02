import { IBodyLogin, IBodyResetPass } from "@/models/IUser.model";
import { fetchApiBase } from "./instances";


export async function login(email: string, password: string): Promise<IBodyLogin> {
    return fetchApiBase.post(`/auth/login`, { email, password });
}

export async function changePassword(newPassword: string, repeatPassword: string): Promise<IBodyResetPass> {
    return fetchApiBase.post(`/user/changePassword`, { newPassword, repeatPassword });
}
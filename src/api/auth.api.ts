import { IBodyLogin } from "@/models/IUser.model";
import { fetchApiBase } from "./instances";


export async function login(email: string, password: string): Promise<IBodyLogin> {
    return fetchApiBase.post(`/auth/login`, { email, password });
}
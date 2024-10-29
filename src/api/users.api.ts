import { IParamsRequest, IResponseApi } from "@/models/IResponseApi.model";
import { fetchApiBase } from "./instances";
import { IUser, IUserRequestBody } from "@/models/IUser.model";

export async function getUser(id: number): Promise<IUser> {
    return fetchApiBase.get(`/user/${id}`);
}

export async function getUsers(params?: IParamsRequest): Promise<IResponseApi<IUser>> {
    return fetchApiBase.get(`/user`, params);
}

export async function updateUser(id: number, body: IUserRequestBody): Promise<any> {
    return fetchApiBase.put(`/user/${id}`, body);
}
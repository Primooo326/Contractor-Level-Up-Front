import { IParamsRequest, IResponseApi } from "@/models/IResponseApi.model";
import { fetchApiBase } from "./instances";
import { IUser, IUserRequestBody } from "@/models/IUser.model";
import { ITemplate } from "@/models/ITemplate.model";

export async function getTemplates(params?: IParamsRequest): Promise<IResponseApi<ITemplate>> {
    return fetchApiBase.get(`/templates`, params);
}

export async function updateTemplate(id: string, body: IUserRequestBody): Promise<any> {
    return fetchApiBase.put(`/user/${id}`, body);
}
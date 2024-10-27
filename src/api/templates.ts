import { IParamsRequest, IResponseApi } from "@/models/IResponseApi.model";
import { fetchApiBase } from "./instances";
import { ITemplate } from "@/models/ITemplate.model";

export async function getTemplates(params?: IParamsRequest): Promise<IResponseApi<ITemplate>> {
    return fetchApiBase.get(`/templates`, params);
}

export const createTemplate = async (data: any) => {
    return await fetchApiBase.post("templates", data);
};

export const updateTemplate = async (data: any, id: string | number) => {
    return await fetchApiBase.put(`templates/${id}`, data);
};

export const deleteTemplate = async (id: string | number) => {
    return await fetchApiBase.delete(`templates/${id}`);
};
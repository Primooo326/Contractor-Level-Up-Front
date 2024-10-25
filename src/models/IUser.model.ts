import { IResponseApiOne } from "./IResponseApi.model";

export interface IPermissionsByModule {
    id: string;
    code: string;
    description: string;
}

export interface IUserModule {
    id: string;
    code: string;
    name: string;
    icon: string;
    path: string;
    permissionsByModule: IPermissionsByModule[];
}

export interface IUserSegment {
    id: string;
    code: string;
    name: string;
    icon: string;
    path: string;
    modules: IUserModule[];
}

export interface IUserProject {
    id: string;
    code: string;
    name: string;
    description: string;
    logo: string;
    segments: IUserSegment[];
}

export interface IClient {
    id: string;
    name: string;
    commercialName: string;
}

export interface IRol {
    id: string;
    name: string;
    client: IClient;
    projects: IUserProject[];
}

export interface IUser {
    id: string;
    username: string;
    name: string;
    cellphone: string;
    email: string;
    rol: IRol;
}

export interface IBodyLogin {
    resetPass: boolean;
    token: string;
    user: IUser;
}

export type TUserLoginResponse = IResponseApiOne<IBodyLogin> | IBodyLogin

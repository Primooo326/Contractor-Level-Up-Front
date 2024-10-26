import { ReactNode } from "react";
import { IResponseApi } from "./IResponseApi.model";
import { IUser } from "./IUser.model";

export interface IPaginationOptions {
    currentItems: any[],
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}
export interface ITableColumn<T> {
    name: string;
    cell: (row: T) => ReactNode;
    selector?: (row: T) => any;
    sortable?: boolean;
}
export interface ITransferRecordType<T> {
    key: string;
    label: string;
    data: T;
    chosen: boolean;
}

export type TUsersGetAllResponse = IResponseApi<IUser>;
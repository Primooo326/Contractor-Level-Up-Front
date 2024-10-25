export interface IResponseApi<T> {
  data: T[];
  statusCode: number;
  message: string;
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface IResponseApiOne<T> {
  data: T;
  statusCode: string;
  message: string;
}

export interface IResponseAuth<T> {
  resetPass: boolean;
  token: string;
  user: any;
}

export interface IParamsRequest {
  term?: string;
  page?: number;
  take?: number;
  order?: "ASC" | "DESC";
}

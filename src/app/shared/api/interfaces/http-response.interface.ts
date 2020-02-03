export interface IHttpResponse {
  data: IHttpMiddleResponse;
  meta: IHttpMeta;
}

export interface IHttpMiddleResponse {
  [key: string]: any;
}

export interface IHttpMeta {
  links: IHttpLinks;
}

export interface IHttpLinks {
  [key: string]: string;
}

export interface IHttpObject {
  [key: string]: any;
}

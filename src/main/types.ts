import { Router } from "express";

interface IErrorResponse {
  errorMessage: string;
}

export type ResponseType<T> = T | IErrorResponse;

export interface IRouter {
  getRouter(): Router;
}

export interface IParamsId {
  id: string;
}

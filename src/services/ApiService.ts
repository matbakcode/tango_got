import {PaginationValues} from "../types";
import {parsePagination} from "../utils/parseApiHeaderLinks";
import axios, {AxiosRequestConfig} from "axios";

export interface GetConfig extends AxiosRequestConfig {
  query?: string;
}

export type ApiResponse<T> = {
  data: T;
  pagination?: PaginationValues;
};

export const ApiClient = {
  get: async <TResponse>(endpoint: string, config?: GetConfig) => {
    let url = process.env.REACT_APP_API_HOST + endpoint;
    if (config?.query) {
      url += "?" + config.query;
    }
    return await axios
      .get<TResponse>(url, config)
      .then(result => {
        const response: ApiResponse<TResponse> = {
          data: result.data,
        };
        if (result.headers["link"]) {
          response.pagination = parsePagination(result.headers["link"]);
        }
        return response;
      })
      .catch(error => Promise.reject(error));
  },
};

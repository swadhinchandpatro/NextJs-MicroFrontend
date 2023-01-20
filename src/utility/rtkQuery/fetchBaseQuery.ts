import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";

/*
 * This is the custom Query function that will be called when we call a api ,
 * We can manipulate the results or capture error handling
 */

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      config?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, config }) => {
    try {
      const result = await http({
        url: baseUrl + url,
        method,
        data,
        params,
        ...config,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
declare module "axios" {
  export interface AxiosRequestConfig {
    setAuthentication?: boolean;
  }
}

/*
 * Axios Intercepters used for adding authentication here , we can change this later as per use case.
 */

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config) {
    if (config.setAuthentication && config.headers) {
      config.headers["Authorization"] = `Bearer 123456`;
    }
  }
  return config;
});

/*
 * Axios HTTP Client , can be used directly for api calling
 */
export const http = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Custom RTK Query Fetcher , basic arugments are supported here , we can add more as per use case.
 */

export const fetcher = ({
  url,
  method,
  body,
  params,
  config,
  headers,
  timeout,
}: {
  url: string;
  method: string;
  body?: object;
  params?: object;
  config?: object;
  headers?: object;
  timeout?: number;
}) => {
  return {
    url: url,
    method: method,
    body: body ?? undefined,
    params: params ?? undefined,
    config: config ?? undefined,
    headers: headers ?? undefined,
    timeout: timeout ?? undefined,
  };
};

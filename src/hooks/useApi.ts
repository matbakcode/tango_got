import {useState} from "react";
import {ApiClient, GetConfig} from "../services/ApiService";
import {PaginationValues} from "../types";

export function useApi<T, Q>(endpoint: string, query?: Q) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationValues | undefined>(
    undefined,
  );
  const config: GetConfig = {};

  if (query) {
    config.query = new URLSearchParams(query).toString();
  }

  const get = () => {
    setIsLoading(true);
    ApiClient.get<T>(endpoint, config)
      .then(response => {
        setPagination(response.pagination);
        setData(response.data);
      })
      .catch(error => {
        setErrorMessage("Error code: " + error.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    get,
    data,
    isLoading,
    pagination,
    errorMessage,
  };
}

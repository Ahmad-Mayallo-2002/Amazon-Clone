import { mainApiEndPoint } from "@/assets/assets";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosRequestConfig } from "axios";

interface DeleteOptions<TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
  config?: AxiosRequestConfig<any>;
}

export function useDelete<TResponse>({
  url,
  onSuccess,
  onError,
  config,
}: DeleteOptions<TResponse>): UseMutationResult<TResponse, unknown, void> {
  return useMutation<TResponse, unknown, void>({
    mutationFn: async () => {
      const response = await axios.delete(mainApiEndPoint + url, config);
      return response.data;
    },
    onSuccess,
    onError,
    retry: 0,
  });
}
